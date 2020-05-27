const parse = require("csv-parse");
const fs = require("fs");
var transform = require("stream-transform");

//한식이 들어올 경우 저장할 변수
//시가 들어올 경우 저장할 변수
//return 업소명, 주소, 대표 품목, 가격
var kindOfFood = "한식";
//시
var cityName = "강남구";

var csvData = [];
var parser = parse({ delimiter: "," });
var cnt = 0;

var input = fs.createReadStream("data.csv", { encoding: "utf-8" }); //파일명, 기본은 utf-8

function fn_test(record) {
  /*
  var qz = record[0];
  var major = record[1];
  console.log(qz, "|", major);
  */
  if (record[0] === kindOfFood) {
    if (record[4] === cityName) {
      console.log(
        `이름 : ${record[1]} 가격 : ${record[8]} 주소 : ${record[5]}`
      );
    }
  }
  //return record[0];
}

var transformer = transform(function (record, callback) {
  if (cnt === 0) console.log(`${cityName} | ${kindOfFood} `);

  if (cnt < 10 && cnt != 0) callback(fn_test(record));
  /*
  {
    csvData.push(callback(fn_test(record));
  }*/
  cnt++;
});

input.pipe(parser).pipe(transformer).pipe(process.stdout);
