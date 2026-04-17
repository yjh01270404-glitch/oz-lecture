// ==========================================================
// DAY37: TypeScript 기초
// 4. 함수 타입 & 클래스 (Function Types & Classes)
// ==========================================================

// ── 함수 타입 표현 ────────────────────────────────────────

// 방법 1: 화살표 함수 타입 별칭
type Add = (a: number, b: number) => number;
const add: Add = (a, b) => a + b;

// 방법 2: 인터페이스로 함수 타입 정의
interface Multiply {
  (a: number, b: number): number;
}
const multiply: Multiply = (a, b) => a * b;

console.log("덧셈:", add(3, 4));       // 7
console.log("곱셈:", multiply(3, 4)); // 12

// ── 선택적 매개변수 & 기본값 ──────────────────────────────
function greet(name: string, greeting: string = "안녕하세요"): string {
  return `${greeting}, ${name}님!`;
}

function buildUrl(base: string, path: string, query?: string): string {
  const url = `${base}/${path}`;
  return query ? `${url}?${query}` : url;
}

console.log(greet("양정호"));                         // 안녕하세요, 양정호님!
console.log(greet("양정호", "반갑습니다"));            // 반갑습니다, 양정호님!
console.log(buildUrl("https://api.com", "users"));    // query 없음
console.log(buildUrl("https://api.com", "users", "page=1")); // query 있음

// ── 나머지 매개변수 (Rest Parameters) ────────────────────
function sum(...numbers: number[]): number {
  return numbers.reduce((acc, n) => acc + n, 0);
}

console.log("합계:", sum(1, 2, 3, 4, 5)); // 15

// ── 오버로드 (Function Overloads) ────────────────────────
function format(value: number): string;
function format(value: string): string;
function format(value: number | string): string {
  if (typeof value === "number") {
    return value.toLocaleString("ko-KR") + "원";
  }
  return `"${value}"`;
}

console.log(format(1500000)); // "1,500,000원"
console.log(format("hello")); // '"hello"'

// ── 클래스 기초 ───────────────────────────────────────────
class Person {
  // 접근 제한자: public(기본), private, protected
  public name: string;
  private _age: number;
  protected email: string;

  constructor(name: string, age: number, email: string) {
    this.name = name;
    this._age = age;
    this.email = email;
  }

  // getter / setter
  get age(): number {
    return this._age;
  }
  set age(value: number) {
    if (value < 0) throw new Error("나이는 0 이상이어야 합니다.");
    this._age = value;
  }

  // 메서드
  introduce(): string {
    return `안녕하세요! 저는 ${this.name}이고, ${this._age}살입니다.`;
  }

  // static 메서드: 인스턴스 없이 호출
  static create(name: string, age: number, email: string): Person {
    return new Person(name, age, email);
  }
}

// ── 클래스 상속 ───────────────────────────────────────────
class Student extends Person {
  private major: string;

  constructor(name: string, age: number, email: string, major: string) {
    super(name, age, email); // 부모 생성자 호출
    this.major = major;
  }

  // 메서드 오버라이드
  introduce(): string {
    return `${super.introduce()} 전공은 ${this.major}입니다.`;
  }

  study(): void {
    console.log(`${this.name}이(가) ${this.major}를 공부합니다.`);
  }
}

// ── 추상 클래스 (Abstract Class) ─────────────────────────
abstract class Shape {
  abstract getArea(): number; // 반드시 자식에서 구현
  abstract name: string;

  describe(): string {
    return `${this.name}의 넓이: ${this.getArea().toFixed(2)}`;
  }
}

class Circle extends Shape {
  name = "원";
  constructor(private radius: number) {
    super();
  }
  getArea(): number {
    return Math.PI * this.radius ** 2;
  }
}

class Rectangle extends Shape {
  name = "직사각형";
  constructor(private width: number, private height: number) {
    super();
  }
  getArea(): number {
    return this.width * this.height;
  }
}

// ── 인터페이스 구현 (implements) ─────────────────────────
interface Serializable {
  serialize(): string;
  deserialize(data: string): void;
}

class UserProfile implements Serializable {
  constructor(public userId: string, public nickname: string) {}

  serialize(): string {
    return JSON.stringify({ userId: this.userId, nickname: this.nickname });
  }

  deserialize(data: string): void {
    const parsed = JSON.parse(data);
    this.userId = parsed.userId;
    this.nickname = parsed.nickname;
  }
}

// ── 실행 ──────────────────────────────────────────────────
const p = new Person("양정호", 25, "yang@test.com");
console.log(p.introduce());

const s = new Student("홍길동", 22, "hong@test.com", "컴퓨터공학");
console.log(s.introduce());
s.study();

const shapes: Shape[] = [new Circle(5), new Rectangle(4, 6)];
shapes.forEach((shape) => console.log(shape.describe()));

const profile = new UserProfile("user_001", "정호");
const json = profile.serialize();
console.log("직렬화:", json);
profile.deserialize('{"userId":"user_002","nickname":"홍길동"}');
console.log("역직렬화 후 닉네임:", profile.nickname);

console.log("=== 함수 타입 & 클래스 예제 완료 ===");
export {};
