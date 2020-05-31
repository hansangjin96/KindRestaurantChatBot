const parse = require("csv-parse");
const fs = require("fs");
//const a = require("./a");
var transform = require("stream-transform");

//한식이 들어올 경우 저장할 변수
//시가 들어올 경우 저장할 변수
//return 업소명, 주소, 대표 품목, 가격
//시
//var kindOfFood = a.kindOfFood;
var cityName = "강남구";
var kindOfFood = "한식";
var foodArray = [];
var csvData = [];
var parser = parse({ delimiter: "," });
var cnt = 0;

var input = fs.createReadStream("data.csv", { encoding: "utf-8" }); //파일명, 기본은 utf-8

function fn_test(record) {
  if (record[0] === kindOfFood) {
    if (record[4] === cityName) {
      foodArray.push(
        `이름 : ${record[1]} 대표매뉴 : ${record[7]}  가격 : ${record[8]}  주소 : ${record[5]}`
      );
    }
  }
}

var transformer = transform(function (record, callback) {
  if (cnt < 10 && cnt != 0) {
    callback(fn_test(record));
  }
  cnt++;
});

function start() {
  input.pipe(parser).pipe(transformer).pipe(process.stdout);
}

start();

function printFood() {
  var i = 0;
  while (i < 10) {
    console.log("출력좀 되라 " + csvData[i]);
    i++;
  }
}

module.exports = {
  start,
};
