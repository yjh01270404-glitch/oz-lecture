// ==========================================================
// DAY37: TypeScript 기초
// 3. 제네릭 (Generics)
// ==========================================================

// ── 제네릭 함수 ────────────────────────────────────────────
// T는 타입 매개변수 (Type Parameter): 호출 시점에 결정됨
function identity<T>(value: T): T {
  return value;
}

console.log(identity<string>("안녕하세요")); // "안녕하세요"
console.log(identity<number>(42));           // 42
console.log(identity(true));                 // 타입 추론으로 T=boolean

// ── 제네릭 배열 유틸 함수 ─────────────────────────────────
function firstItem<T>(arr: T[]): T | undefined {
  return arr[0];
}

function lastItem<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}

console.log(firstItem([1, 2, 3]));        // 1
console.log(lastItem(["a", "b", "c"]));   // "c"

// ── 제네릭 인터페이스 ─────────────────────────────────────
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  timestamp: Date;
}

interface Product {
  id: number;
  name: string;
  price: number;
}

const productResponse: ApiResponse<Product> = {
  data: { id: 1, name: "노트북", price: 1500000 },
  status: 200,
  message: "성공",
  timestamp: new Date(),
};

const listResponse: ApiResponse<Product[]> = {
  data: [
    { id: 1, name: "노트북", price: 1500000 },
    { id: 2, name: "마우스", price: 25000 },
  ],
  status: 200,
  message: "목록 조회 성공",
  timestamp: new Date(),
};

console.log("상품:", productResponse.data.name);
console.log("목록 수:", listResponse.data.length);

// ── 제네릭 클래스 ─────────────────────────────────────────
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
    console.log(`[Stack] push: ${item}`);
  }

  pop(): T | undefined {
    const item = this.items.pop();
    console.log(`[Stack] pop: ${item}`);
    return item;
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  get size(): number {
    return this.items.length;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

const numStack = new Stack<number>();
numStack.push(10);
numStack.push(20);
numStack.push(30);
numStack.pop();
console.log("최상단:", numStack.peek()); // 20
console.log("크기:", numStack.size);     // 2

// ── 제네릭 제약 (Constraints) ─────────────────────────────
// T extends { length: number } → length 속성이 있는 타입만 허용
function getLength<T extends { length: number }>(value: T): number {
  return value.length;
}

console.log(getLength("hello"));       // 5
console.log(getLength([1, 2, 3, 4]));  // 4
// console.log(getLength(42));          // ❌ number는 length 없음

// keyof 제약: 객체의 키 타입만 허용
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: "양정호", age: 25, email: "yang@test.com" };
console.log(getProperty(user, "name"));  // "양정호"
console.log(getProperty(user, "age"));   // 25
// console.log(getProperty(user, "phone")); // ❌ 컴파일 오류

// ── Utility Types (내장 제네릭) ───────────────────────────
interface Todo {
  id: number;
  title: string;
  completed: boolean;
  description: string;
}

// Partial<T>: 모든 프로퍼티를 선택적으로
type PartialTodo = Partial<Todo>;

// Required<T>: 모든 프로퍼티를 필수로
type RequiredTodo = Required<Todo>;

// Readonly<T>: 모든 프로퍼티를 읽기 전용으로
type ReadonlyTodo = Readonly<Todo>;

// Pick<T, K>: 특정 프로퍼티만 선택
type TodoPreview = Pick<Todo, "id" | "title" | "completed">;

// Omit<T, K>: 특정 프로퍼티 제외
type TodoWithoutDesc = Omit<Todo, "description">;

// Record<K, V>: 키-값 타입 매핑
type StatusMap = Record<string, "pending" | "done" | "failed">;
const taskStatus: StatusMap = {
  task1: "done",
  task2: "pending",
  task3: "failed",
};

console.log("=== 제네릭 예제 완료 ===");
export {};
