// DAY25 - React 상태관리와 Props
import { useState } from 'react'

function Counter({ title, color, step = 1 }) {
  const [count, setCount] = useState(0)
  return (
    <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', textAlign: 'center' }}>
      <h3 style={{ color, marginBottom: '0.5rem' }}>{title}</h3>
      <div style={{ fontSize: '3.5rem', fontWeight: 'bold', color, margin: '0.75rem 0' }}>{count}</div>
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
        <button onClick={() => setCount(n => n - step)} style={{ padding: '0.5rem 1.2rem', background: '#fee2e2', border: 'none', borderRadius: '8px', color: '#dc2626', fontSize: '1.1rem' }}>-{step}</button>
        <button onClick={() => setCount(0)} style={{ padding: '0.5rem 0.8rem', background: '#f3f4f6', border: 'none', borderRadius: '8px', color: '#666' }}>리셋</button>
        <button onClick={() => setCount(n => n + step)} style={{ padding: '0.5rem 1.2rem', background: '#dcfce7', border: 'none', borderRadius: '8px', color: '#16a34a', fontSize: '1.1rem' }}>+{step}</button>
      </div>
    </div>
  )
}

function TodoList() {
  const [todos, setTodos] = useState(['useState 이해하기', 'Props 패턴 학습', '제어 컴포넌트 실습'])
  const [input, setInput] = useState('')
  const add = () => { if (input.trim()) { setTodos(p => [...p, input.trim()]); setInput('') } }
  return (
    <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <h3 style={{ marginBottom: '1rem' }}>📝 학습 목록 (제어 컴포넌트)</h3>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && add()} placeholder="학습할 내용..." style={{ flex: 1, padding: '0.6rem 1rem', border: '2px solid #e5e7eb', borderRadius: '8px', outline: 'none' }} />
        <button onClick={add} style={{ padding: '0.6rem 1.2rem', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600' }}>추가</button>
      </div>
      <ul style={{ listStyle: 'none' }}>
        {todos.map((t, i) => (
          <li key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0', borderBottom: '1px solid #f3f4f6' }}>
            <span>✅ {t}</span>
            <button onClick={() => setTodos(p => p.filter((_, j) => j !== i))} style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer' }}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function App() {
  const [theme, setTheme] = useState('#4f46e5')
  const themes = ['#4f46e5', '#dc2626', '#16a34a', '#d97706', '#7c3aed']
  return (
    <div style={{ minHeight: '100vh' }}>
      <header style={{ background: theme, color: 'white', padding: '1.5rem 2rem', transition: 'background 0.3s' }}>
        <h1>DAY25 — React 상태관리와 Props</h1>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
          {themes.map(c => <button key={c} onClick={() => setTheme(c)} style={{ width: '28px', height: '28px', borderRadius: '50%', background: c, border: theme === c ? '3px solid white' : '2px solid rgba(255,255,255,0.4)', cursor: 'pointer' }} />)}
        </div>
      </header>
      <main style={{ maxWidth: '700px', margin: '2rem auto', padding: '0 1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
        <Counter title="기본 카운터" color="#4f46e5" step={1} />
        <Counter title="5씩 변경" color="#16a34a" step={5} />
      </main>
      <div style={{ maxWidth: '700px', margin: '0 auto 2rem', padding: '0 1rem' }}><TodoList /></div>
    </div>
  )
}
