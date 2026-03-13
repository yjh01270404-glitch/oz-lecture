const STAR = "*";

const getPromptInput = () => {
  let input;
  let isNotValid = true;
  while (isNotValid) {
    let inputStr = prompt("출력할 별 개수 입력 (1~10):");
    input = Number(inputStr);
    if (isNaN(input) || input < 1 || input > 10) {
      console.log("Invalid input! Enter a number between 1 and 10.");
      continue;
    }
    isNotValid = false;
    break;
  }
  return input;
};

function printStars(count = 1) {
  var stars = "";
  for (let i = 0; i < count; i++) {
    stars = stars + STAR;
  }
  console.log(stars);
}

const userInput = getPromptInput();
printStars(userInput);
