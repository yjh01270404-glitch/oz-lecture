// ==========================================================
// DAY37: TypeScript 기초
// 1. 기본 타입 (Basic Types)
// ==========================================================

// ── 원시 타입 ─────────────────────────────────────────────
let userName: string = "양정호";
let userAge: number = 25;
let isLoggedIn: boolean = true;
let nothing: null = null;
let undef: undefined = undefined;

// ── any / unknown / never ─────────────────────────────────
let anyVal: any = "아무거나";
anyVal = 42; // any는 타입 체크 없이 재할당 가능

let unknownVal: unknown = "unknown도 아무거나지만 사용 전 타입 좁히기 필요";
if (typeof unknownVal === "string") {
  console.log(unknownVal.toUpperCase()); // 타입 좁히기 후 사용
}

// never: 절대 반환되지 않는 함수 (예: 항상 예외 던짐)
function throwError(msg: string): never {
  throw new Error(msg);
}

// ── 배열 & 튜플 ────────────────────────────────────────────
const fruits: string[] = ["apple", "banana", "cherry"];
const scores: Array<number> = [100, 95, 88];

// 튜플: 고정 길이, 고정 타입 순서
const user: [string, number, boolean] = ["양정호", 25, true];
console.log(`이름: ${user[0]}, 나이: ${user[1]}`);

// ── 열거형 (Enum) ──────────────────────────────────────────
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}
const move: Direction = Direction.Up;
console.log("이동 방향:", move); // "UP"

// ── 유니온 & 교차 타입 ────────────────────────────────────
type StringOrNumber = string | number;
let id: StringOrNumber = "abc123";
id = 42; // 둘 다 허용

type WithTimestamp = { createdAt: Date };
type Post = { title: string; content: string } & WithTimestamp; // 교차 타입

const post: Post = {
  title: "TypeScript 공부",
  content: "기본 타입부터 시작!",
  createdAt: new Date(),
};

// ── 타입 단언 (Type Assertion) ────────────────────────────
const input = document.getElementById("username") as HTMLInputElement;
// input.value; // 이제 HTMLInputElement 속성 사용 가능

console.log("=== 기본 타입 예제 완료 ===");
export {};
