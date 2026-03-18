// DOM 요소 선택
const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const clearButton = document.getElementById("clearButton");

// 할 일 추가 함수
function addTask() {
  const text = taskInput.value.trim();

  // 빈칸이면 경고
  if (text === "") {
    alert("할 일을 입력해주세요!");
    return;
  }

  // li, span, 삭제버튼 생성
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = text;

  // 텍스트 클릭 시 완료 토글
  span.addEventListener("click", function () {
    span.classList.toggle("completed");
  });

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "삭제";
  deleteButton.classList.add("delete-button");

  // 삭제 버튼 클릭 시 li 제거
  deleteButton.addEventListener("click", function () {
    taskList.removeChild(li);
  });

  // li에 span, 버튼 붙이고 목록에 추가
  li.appendChild(span);
  li.appendChild(deleteButton);
  taskList.appendChild(li);

  // 입력창 초기화
  taskInput.value = "";
}

// 추가 버튼 클릭
addButton.addEventListener("click", function () {
  addTask();
});

// Enter 키 입력
taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

// 전체 삭제
clearButton.addEventListener("click", function () {
  taskList.innerHTML = "";
});
