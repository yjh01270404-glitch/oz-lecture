// 상수 선언 (const)
const MAX_TIME = 10;
const MIN_TIME = 1;

// 타이머 카운트 변수 (let)
let timerCount = 0;

// 타이머 메시지 변수 (var)
var timerMessage = "";

// 버튼, 입력, 출력 요소 가져오기
const startBtn = document.getElementById("startTimer");
const timerInput = document.getElementById("timerInput");
const timerDisplay = document.getElementById("timerDisplay");

// 타이머 함수 선언문 (매개변수 기본값 seconds = 10)
function startTimer(seconds = 10) {
  timerCount = seconds;

  // 에러 클래스 제거
  timerDisplay.classList.remove("error");

  // 버튼 비활성화
  startBtn.disabled = true;

  // setInterval로 1초마다 카운트다운
  const interval = setInterval(function () {
    // 종료 체크 먼저
    if (timerCount <= 0) {
      clearInterval(interval);
      timerDisplay.textContent = "타이머 종료!";
      startBtn.disabled = false;
      return;
    }

    // 화면에 표시 후 감소
    timerDisplay.textContent = "타이머: " + timerCount + "초";
    timerCount--;
  }, 1000);
}

// 버튼 클릭 이벤트 리스너
startBtn.addEventListener("click", function () {
  const inputValue = document.getElementById("timerInput").value;
  const seconds = Number(inputValue);

  // 유효성 검사
  if (
    isNaN(seconds) ||
    seconds < MIN_TIME ||
    seconds > MAX_TIME ||
    inputValue === ""
  ) {
    timerDisplay.textContent = "유효한 숫자(1-10)를 입력하세요!";
    timerDisplay.classList.add("error");
    return;
  }

  startTimer(seconds);
});
