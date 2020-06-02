const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");
const colors = require("colors");
const parse = require("csv-parse/lib/sync");
const fs = require("fs");
const csv = fs.readFileSync("data.csv");
const records = parse(csv.toString("utf-8"));

const findFoodEntity = "업종";
const findCityEntity = "세부위치엔티티";

var kindOfFood = "한식";
var cityName = "강남구";

var watson = require("./util/watson");

var csvData = [];

//Route files
const index = require("./routes/index");
const app = express();
dotenv.config({ path: "./config/config.env" });

//Mount the router
app.use("/api/v1", index);

app.use("/", express.static("public"));

const PORT = process.env.PORT;
const server = app.listen(
  PORT,
  console.log(`Server running on port ${PORT}`.yellow)
);

//Handel unhandled promise rejections
process.on("unhandledRejection", (err, Promise) => {
  console.log(`Error  ${err.message}`.red);
  //close server & exit process
  server.close(() => process.exit(1));
});

var io = require("socket.io")(server);
var ss = require("socket.io-stream");

io.on("connection", function (socket) {
  console.log("Connected");

  var context = {};
  socket.on("sendmsg", function (data) {
    watson.message(data.message, context, function (err, res) {
      if (!err) {
        //console.log(res);
        context = res.result.context;
        console.log(res.result);

        if (Array.isArray(res.result.output.text)) {
          if (res.result.entities.length > 0) {
            if (res.result.entities[0].entity === findFoodEntity) {
              kindOfFood = res.result.entities[0].value;
              for (let i = 0; i < records.length; i++) {
                if (records[i][0] === kindOfFood && records[i][4] === cityName)
                  csvData.push(records[i][1]);
              }
              conversation_response = csvData;
            } else if (res.result.entities[0].entity === findCityEntity) {
              cityName = res.result.entities[0].value;
              conversation_response = res.result.output.text[0];
            } else {
              conversation_response = res.result.output.text[0];
            }
          } else {
            conversation_response = res.result.output.text[0];
          }

          //conversation_response = res.result.output.text[0];
          /*option 처리
          if (
            res.result.output.generic[res.result.output.generic.length - 1]
              .response_type.length > 0
          ) {
            conversation_response +=
              res.result.output.generic[res.result.output.generic.length - 1]
                .title;
            for (let i = 0; i < res.result.output.generic.length - 1; i++) {
              conversation_response +=
                result.output.generic[res.result.output.generic.length - i]
                  .text;
            }
          }
          */
          //text 길이에 따라 출력
          /*
          if (res.result.output.text.length === 1) {
            if (res.result.entities.value === "한식") {
              console.log("한식!!!!!!!!!!!!!!!!!!!");

              callReadFile(function (data) {
                resultData = data;
                console.log(resultData);
              });
            }
            conversation_response = res.result.output.text[0];
          } else if (res.result.output.text.length > 1) {
            
            conversation_response = res.result.entities.value;

            if (res.result.entities.value === "한식") {
              console.log("한식!!!!!!!!!!!!!!!!!!!");

              callReadFile(function (data) {
                resultData = data;
                console.log(resultData);
              });
            }
            
            conversation_response =
            res.result.output.text[res.result.output.text.length - 1];
          }*/
        }
        //.join(' ').trim();
        else conversation_response = undefined;
        if (conversation_response) {
          var payload = {
            user: "System",
            message: conversation_response,
            ts: new Date().getTime(),
            type: data.type || "text",
          };
          socket.emit("replymsg", payload);
        }
      }
    });
  });

  ss(socket).on("recognize", function (stream, data) {
    watson.recognize(
      stream,
      function (err) {
        console.log("Error:", err);
      },
      function (res) {
        var transcript = res;
        socket.emit("transcript", { message: transcript, ts: data.ts });
        console.log(JSON.stringify(res, null, 2));
      }
    );
  });
});
