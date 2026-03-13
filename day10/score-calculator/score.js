// 변수 선언
const maxScore = 100;
let input = prompt("점수를 입력하세요.");
let score = Number(input);
var grade;
score += 5;
console.log(score);

// 등급 부여
if (score >= 100) {
  grade = "S";
} else if (score >= 90) {
  grade = "A";
} else if (score >= 80) {
  grade = "B";
} else if (score >= 70) {
  grade = "C";
} else if (score >= 60) {
  grade = "D";
} else {
  grade = "F";
}

console.log("Final Score: " + score);
console.log("Grade: " + grade);

// 합격/불합격
const status = score >= 60 ? "Pass" : "Fail";

console.log("Final Score: " + score);
console.log("Grade: " + grade);
console.log("Status: " + status);

// 등급별 메시지
switch (grade) {
  case "S":
    console.log("Message: Super!!");
    break;
  case "A":
    console.log("Message: Excellent work!");
    break;
  case "B":
    console.log("Message: Good job!");
    break;
  case "C":
    console.log("Message: Satisfactory performance.");
    break;
  case "D":
    console.log("Message: Needs improvement.");
    break;
  default:
    console.log("Message: Please try harder!")