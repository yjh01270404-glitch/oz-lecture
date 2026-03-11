// 변수 선언 - number 타입
let age = 40;
// 변수 선언 - string 타입
let name = "양정호";
// 변수 선언 - boolean 타입
let isStudent = false;

console.log(age);
console.log(name);
console.log(isStudent);


// 배열 선언 - 취미 목록
let hobbies = ["독서", "코딩", "게임"]
console.log(hobbies);


// 객체 선언 - 개인 프로필
let profile = {
    name: "양정호",
    age: 40,
    isStudent: true
};
console.log(profile.name);
console.log(profile.age);
// typeof - 데이터 타입 확인
console.log(typeof age);
console.log(typeof name);
console.log(typeof isStudent);


// 변수 선언 - var 사용
var city = "서울";
// 변수 선언 - const 사용
const country = "한국";

console.log(city);
console.log(country);
// 문자열 연결
console.log("이름: " + name + "\n나이: " + age);


// 변수 선언 - null과 undefined
let email = null;
let phone;

console.log(typeof email);
console.log(typeof phone);
console.log(null === undefined);
// 템플릿 문자열
console.log(`이름: ${name}, 나이: ${age}, 학생: ${isStudent}`);


// 혼합 배열 선언
let mixedArray = ["독서", 40, null];

console.log(typeof mixedArray[0]);
console.log(typeof mixedArray[1]);
console.log(typeof mixedArray[2]);