import React, { useState, useCallback, useMemo, lazy, Suspense } from 'react'
import Child from './Child.jsx'

// React.lazy로 ExpensiveList 지연 로딩
const ExpensiveList = lazy(() => import('./ExpensiveList.jsx'))

function App() {
  const [count, setCount] = useState(0)
  const [toggle, setToggle] = useState(false)

  // useCallback: 함수 재생성 방지 — count가 변할 때만 새 함수 생성
  const handleClick = useCallback(() => {
    console.log('[handleClick] 호출됨, count:', count)
    setCount((prev) => prev + 1)
  }, [count])

  // useMemo: 짝수 배열 계산 메모이제이션 — count가 변할 때만 재계산
  const evenNumbers = useMemo(() => {
    console.log('[useMemo] evenNumbers 재계산')
    return Array.from({ length: 100 }, (_, i) => i + 1).filter((n) => n % 2 === 0)
  }, [count])

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1>⚛️ React 성능 최적화 데모</h1>

      {/* 카운터 */}
      <section style={{ marginBottom: '32px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2>🔢 useCallback + React.memo</h2>
        <p>카운트: <strong>{count}</strong></p>
        <button onClick={handleClick} style={btnStyle('#4f46e5')}>
          카운트 증가
        </button>
        <button onClick={() => setToggle((t) => !t)} style={{ ...btnStyle('#059669'), marginLeft: '8px' }}>
          토글 (toggle: {toggle ? 'ON' : 'OFF'})
        </button>
        <p style={{ fontSize: '13px', color: '#666' }}>
          💡 토글 버튼을 눌러도 Child는 리렌더링되지 않습니다 (React.memo + useCallback)
        </p>
        {/* React.memo 적용된 Child */}
        <Child handleClick={handleClick} />
      </section>

      {/* useMemo */}
      <section style={{ marginBottom: '32px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2>🧠 useMemo — 짝수 배열</h2>
        <p>1~100 중 짝수 개수: <strong>{evenNumbers.length}개</strong></p>
        <p style={{ fontSize: '13px', color: '#666' }}>
          처음 {evenNumbers.slice(0, 10).join(', ')} ...
        </p>
        <p style={{ fontSize: '13px', color: '#666' }}>
          💡 count가 바뀔 때만 재계산됩니다
        </p>
      </section>

      {/* React.lazy + Suspense */}
      <section style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2>⏳ React.lazy + Suspense</h2>
        <Suspense fallback={<p style={{ color: '#f59e0b' }}>🔄 로딩 중...</p>}>
          <ExpensiveList />
        </Suspense>
      </section>
    </div>
  )
}

const btnStyle = (color) => ({
  padding: '8px 16px',
  backgroundColor: color,
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold',
})

export default App
