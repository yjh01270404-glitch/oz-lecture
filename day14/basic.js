function sayHello(name, callback) {
  console.log(`안녕, ${name}`);
  callback();
}

function sayHelloSync(name) {
  console.log(`[sync] 안녕, ${name}`);
}

sayHelloSync("정호");
sayHello("정호", () => {
  console.log("콜백 함수 실행");
});
