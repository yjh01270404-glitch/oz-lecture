// DAY26 - React 동적 렌더링 (조건부 렌더링 + 리스트 렌더링)
import { useState } from 'react'

export default function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: '조건부 렌더링 학습', done: true, priority: 'high' },
    { id: 2, text: 'map으로 리스트 렌더링', done: true, priority: 'high' },
    { id: 3, text: '배열 filter 활용', done: false, priority: 'medium' },
    { id: 4, text: 'key prop 이해', done: false, priority: 'low' },
  ])
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState('all')
  const [priority, setPriority] = useState('medium')

  const add = () => {
    if (!input.trim()) return
    setTodos(p => [...p, { id: Date.now(), text: input.trim(), done: false, priority }])
    setInput('')
  }
  const toggle = id => setTodos(p => p.map(t => t.id === id ? { ...t, done: !t.done } : t))
  const remove = id => setTodos(p => p.filter(t => t.id !== id))
  const filtered = todos.filter(t => filter === 'all' ? true : filter === 'done' ? t.done : !t.done)

  const pColor = { high: '#dc2626', medium: '#d97706', low: '#16a34a' }
  const pLabel = { high: '높음', medium: '보통', low: '낮음' }
  const doneCount = todos.filter(t => t.done).length

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#667eea,#764ba2)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: '520px', background: 'white', borderRadius: '20px', padding: '2rem', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
        <h1 style={{ color: '#4f46e5', marginBottom: '0.25rem', fontSize: '1.4rem' }}>DAY26 — 동적 렌더링</h1>

        {/* 조건부 렌더링: 진행 상태 */}
        <p style={{ color: '#999', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          {doneCount === todos.length && todos.length > 0 ? '🎉 모두 완료!' : `완료: ${doneCount} / ${todos.length}`}
        </p>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && add()} placeholder="할 일 입력..." style={{ flex: 1, padding: '0.7rem 1rem', borderRadius: '10px', border: '2px solid #e5e7eb', outline: 'none' }} />
          <button onClick={add} style={{ padding: '0.7rem 1.2rem', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '10px', fontWeight: '600' }}>추가</button>
        </div>

        {/* 우선순위 선택 */}
        <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.75rem' }}>
          {['high', 'medium', 'low'].map(p => (
            <button key={p} onClick={() => setPriority(p)} style={{ flex: 1, padding: '0.4rem', borderRadius: '8px', border: 'none', fontSize: '0.8rem', background: priority === p ? pColor[p] : '#f3f4f6', color: priority === p ? 'white' : '#666' }}>{pLabel[p]}</button>
          ))}
        </div>

        {/* 필터 버튼 */}
        <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1rem' }}>
          {[['all', '전체'], ['todo', '미완료'], ['done', '완료']].map(([v, l]) => (
            <button key={v} onClick={() => setFilter(v)} style={{ flex: 1, padding: '0.4rem', borderRadius: '8px', border: 'none', fontSize: '0.85rem', background: filter === v ? '#4f46e5' : '#f3f4f6', color: filter === v ? 'white' : '#666', fontWeight: filter === v ? '600' : '400' }}>{l}</button>
          ))}
        </div>

        {/* 조건부 렌더링: 빈 상태 */}
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', color: '#bbb', padding: '2rem' }}>항목이 없습니다 🚀</div>
        )}

        {/* 동적 리스트 렌더링 (.map) */}
        <ul style={{ listStyle: 'none' }}>
          {filtered.map(todo => (
            <li key={todo.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 0', borderBottom: '1px solid #f3f4f6' }}>
              <input type="checkbox" checked={todo.done} onChange={() => toggle(todo.id)} style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: pColor[todo.priority], flexShrink: 0 }} />
              <span style={{ flex: 1, textDecoration: todo.done ? 'line-through' : 'none', color: todo.done ? '#bbb' : '#333' }}>{todo.text}</span>
              <button onClick={() => remove(todo.id)} style={{ background: 'none', border: 'none', color: '#ddd', cursor: 'pointer' }}>✕</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
