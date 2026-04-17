import { greet } from './utils.js';

// var, let, const 각각 한 번씩 사용
var appTitle = 'Hello, Node.js & Vite!';
let version = process.version || 'unknown';
const minVersion = 18;

// Node.js 버전 체크
const majorVersion = parseInt((version.match(/\d+/) || ['0'])[0], 10);
if (majorVersion >= minVersion) {
  console.log(`Node.js 버전 ${version} - 정상 (18 이상)`);
} else {
  console.log(`경고: Node.js 버전이 ${minVersion} 미만입니다. 현재: ${version}`);
}

// #app 텍스트 설정
document.querySelector('#app').textContent = appTitle;

// greet 함수 호출
console.log(greet('Vite'));

// 버튼 클릭 이벤트
document.querySelector('#btn').addEventListener('click', () => {
  console.log('버튼이 클릭되었습니다!');
});
