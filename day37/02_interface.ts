// ==========================================================
// DAY37: TypeScript 기초
// 2. 인터페이스 & 타입 별칭 (Interface & Type Alias)
// ==========================================================

// ── 인터페이스 기본 ────────────────────────────────────────
interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // 선택적 프로퍼티 (optional)
  readonly createdAt: Date; // 읽기 전용
}

const user1: User = {
  id: 1,
  name: "양정호",
  email: "yang@example.com",
  age: 25,
  createdAt: new Date("2024-01-01"),
};

// user1.createdAt = new Date(); // ❌ readonly → 컴파일 오류

// ── 인터페이스 확장 (extends) ─────────────────────────────
interface Admin extends User {
  role: "superadmin" | "moderator";
  permissions: string[];
}

const admin: Admin = {
  id: 100,
  name: "관리자",
  email: "admin@example.com",
  role: "superadmin",
  permissions: ["read", "write", "delete"],
  createdAt: new Date(),
};

// ── 함수 인터페이스 ────────────────────────────────────────
interface Formatter {
  (value: string, prefix: string): string;
}

const addPrefix: Formatter = (value, prefix) => `${prefix} ${value}`;
console.log(addPrefix("양정호", "안녕하세요,"));

// ── 인덱스 시그니처 ────────────────────────────────────────
interface ScoreMap {
  [subject: string]: number; // 키: string, 값: number
}

const scores: ScoreMap = {
  math: 95,
  english: 88,
  science: 92,
};

// ── 타입 별칭 (Type Alias) ────────────────────────────────
type Point = {
  x: number;
  y: number;
};

type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rectangle"; width: number; height: number };

// 판별 유니온 (Discriminated Union) 패턴
function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
  }
}

const circle: Shape = { kind: "circle", radius: 5 };
const rect: Shape = { kind: "rectangle", width: 4, height: 6 };

console.log("원 넓이:", getArea(circle).toFixed(2));
console.log("직사각형 넓이:", getArea(rect));

// ── 인터페이스 vs 타입 별칭 차이 ─────────────────────────
// Interface: 선언 병합(Declaration Merging) 가능
interface Animal {
  name: string;
}
interface Animal {
  sound: string; // 같은 이름으로 다시 선언하면 병합됨
}

const dog: Animal = { name: "강아지", sound: "멍멍" };
console.log(dog);

console.log("=== 인터페이스 예제 완료 ===");
export {};
