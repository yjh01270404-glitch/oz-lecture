// 상수 선언 (const)
const fetchBtn = document.getElementById("fetchPosts");
const postIdsInput = document.getElementById("postIds");
const output = document.getElementById("output");

// 결과 저장 객체 (let)
let results = {};

// 상태 메시지 (var)
var statusMessage = "";

// 화살표 함수 + rest 파라미터로 데이터 가져오기
const fetchMultiplePosts = async (...ids) => {
  results = {};

  // for...of로 ID 순회하며 fetch
  for (const id of ids) {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      const data = await response.json();
      // 결과 객체에 저장
      results[`post${id}`] = data.title;
    } catch (error) {
      results[`post${id}`] = "에러: " + error.message;
    }
  }
};

// 함수 표현식으로 메인 로직 구현
const runChallenge = async function () {
  const inputValue = postIdsInput.value;

  // 빈 값 체크
  if (inputValue.trim() === "") {
    output.classList.add("error");
    output.textContent = "유효한 ID(1-100)를 입력하세요!";
    return;
  }

  // 쉼표로 분리 후 숫자 변환
  const ids = inputValue.split(",").map(Number);

  // 유효한 ID만 필터링 (1~100)
  const validIds = ids.filter(function (id) {
    return !isNaN(id) && id >= 1 && id <= 100;
  });

  // 유효한 ID 없으면 에러
  if (validIds.length === 0) {
    output.classList.add("error");
    output.textContent = "유효한 ID(1-100)를 입력하세요!";
    return;
  }

  // 에러 클래스 제거
  output.classList.remove("error");

  // 버튼 비활성화
  fetchBtn.disabled = true;

  // 데이터 가져오기 (rest로 배열 펼쳐서 전달)
  await fetchMultiplePosts(...validIds);

  // for...in으로 결과 객체 순회하며 렌더링
  let html = "";
  for (const key in results) {
    html += `<div class="post">${key}: ${results[key]}</div>`;
  }
  output.innerHTML = html;

  // 버튼 활성화
  fetchBtn.disabled = false;
};

// 버튼 클릭 이벤트
fetchBtn.addEventListener("click", runChallenge);
