# DAY38: React에서 TypeScript 활용하기
# 과목: Redux / Next.js / TypeScript
# 작성일: 2026-04-23

GREETING_TSX = '''
interface GreetingProps {
    name: string;
    age?: number;
    onClick?: () => void;
    city?: { city: string };
}

export default function Greeting({ name, age, onClick, city }: GreetingProps) {
    return (
        <div>
            <h2>
                안녕하세요, {name}
                {age ?  + '' + (세) + '' +  : " (나이 정보 없음)"}
                {city && , 에 사는 }
            </h2>
            {onClick && <button onClick={onClick}>클릭</button>}
        </div>
    );
}
'''

COUNTER_TSX = '''
import { useState } from "react";

export default function Counter() {
    const [count, setCount] = useState<number>(0);
    const [items, setItems] = useState<string[]>([]);
    return (
        <div>
            <p>현재 값: {count}</p>
            <button onClick={() => setCount(count + 1)}>+</button>
            <button onClick={() => setCount(count - 1)}>-</button>
            <ul>{items.map((item, i) => <li key={i}>{item}</li>)}</ul>
            <button onClick={() => setItems([...items, 아이템 ])}>아이템 추가</button>
        </div>
    );
}
'''

APP_TSX = '''
import Greeting from "./Greeting";
import Counter from "./Counter";

export default function App() {
    return (
        <div>
            <h1>TypeScript + React 연습</h1>
            <Greeting name="Alice" age={25} city={{ city: "서울" }} />
            <Greeting name="Bob" onClick={() => console.log("Bob 클릭!")} />
            <Counter />
        </div>
    );
}
'''

def main():
    print("=== DAY38: React에서 TypeScript 활용하기 ===")
    print("Props 타입: interface GreetingProps { name: string; age?: number; }")
    print("Counter: useState<number>(0), useState<string[]>([])")
    print("실행: npm create vite@latest ts-react-practice -- --template react-ts")
    print("과제 완료!")

if __name__ == "__main__":
    main()
