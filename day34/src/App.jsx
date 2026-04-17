// DAY34 - React Hooks & Custom Hooks
import { useState } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import { useDebounce } from './hooks/useDebounce'
import { useWindowSize } from './hooks/useWindowSize'
import { useToggle } from './hooks/useToggle'
import { useFetch } from './hooks/useFetch'

const card = { background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', marginBottom: '1.5rem' }
const badge = { display: 'inline-block', background: '#ede9fe', color: '#4f46e5', padding: '0.25rem 0.75rem', borderRadius: '20px', fontWeight: '700', fontSize: '0.9rem' }
const codeBlock = (content) => (
  <pre style={{ background: '#1e293b', color: '#7dd3fc', padding: '0.75rem 1rem', borderRadius: '8px', fontSize: '0.8rem', fontFamily: 'monospace', whiteSpace: 'pre-wrap', marginBottom: '1rem' }}>{content}</pre>
)

// ===== 1. useLocalStorage 데모 =====
function LocalStorageDemo() {
  const [name, setName, removeName] = useLocalStorage('user_name', '')
  return (
    <div style={card}>
      <h2 style={{ marginBottom: '0.25rem', color: '#333' }}>💾 useLocalStorage</h2>
      <p style={{ color: '#9ca3af', fontSize: '0.8rem', fontFamily: 'monospace', marginBottom: '1rem' }}>useLocalStorage(key, initialValue) → [value, setValue, remove]</p>
      {codeBlock(`const [name, setName, remove] = useLocalStorage('user_name', '')\n// 브라우저를 새로고침해도 값이 유지됩니다`)}
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="이름 입력 (새로고침해도 유지)" style={{ flex: 1, padding: '0.6rem 1rem', border: '2px solid #e5e7eb', borderRadius: '8px', outline: 'none', fontFamily: 'inherit' }} />
        <button onClick={removeName} style={{ padding: '0.6rem 1rem', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '8px', cursor: 'pointer', fontFamily: 'inherit' }}>삭제</button>
      </div>
      {name && <p style={{ marginTop: '0.75rem', color: '#666' }}>저장된 값: <span style={badge}>{name}</span></p>}
    </div>
  )
}

// ===== 2. useDebounce 데모 =====
function DebounceDemo() {
  const [input, setInput] = useState('')
  const debounced = useDebounce(input, 500)
  return (
    <div style={card}>
      <h2 style={{ marginBottom: '0.25rem', color: '#333' }}>⏱ useDebounce</h2>
      <p style={{ color: '#9ca3af', fontSize: '0.8rem', fontFamily: 'monospace', marginBottom: '1rem' }}>useDebounce(value, delay) → debouncedValue</p>
      {codeBlock(`const debounced = useDebounce(input, 500)\nuseEffect(() => { search(debounced) }, [debounced])\n// 입력 중에는 API 호출 안 함. 500ms 후에만 실행.`)}
      <input value={input} onChange={e => setInput(e.target.value)} placeholder="검색어 입력 (500ms 딜레이 적용)" style={{ width: '100%', padding: '0.6rem 1rem', border: '2px solid #e5e7eb', borderRadius: '8px', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} />
      <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.75rem' }}>
        <div><p style={{ fontSize: '0.8rem', color: '#9ca3af' }}>실시간 값</p><span style={{ ...badge, background: '#fef3c7', color: '#d97706' }}>{input || '(없음)'}</span></div>
        <div><p style={{ fontSize: '0.8rem', color: '#9ca3af' }}>디바운스 후</p><span style={badge}>{debounced || '(없음)'}</span></div>
      </div>
    </div>
  )
}

// ===== 3. useWindowSize 데모 =====
function WindowSizeDemo() {
  const { width, height } = useWindowSize()
  return (
    <div style={card}>
      <h2 style={{ marginBottom: '0.25rem', color: '#333' }}>📐 useWindowSize</h2>
      <p style={{ color: '#9ca3af', fontSize: '0.8rem', fontFamily: 'monospace', marginBottom: '1rem' }}>{'useWindowSize() → { width, height }'}</p>
      {codeBlock(`const { width, height } = useWindowSize()\n// resize 이벤트 리스너를 자동으로 등록/해제합니다`)}
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <div><p style={{ fontSize: '0.8rem', color: '#9ca3af' }}>너비</p><span style={badge}>{width}px</span></div>
        <div><p style={{ fontSize: '0.8rem', color: '#9ca3af' }}>높이</p><span style={badge}>{height}px</span></div>
        <div><p style={{ fontSize: '0.8rem', color: '#9ca3af' }}>화면 타입</p><span style={{ ...badge, background: '#f0fdf4', color: '#16a34a' }}>{width >= 1024 ? '데스크톱' : width >= 768 ? '태블릿' : '모바일'}</span></div>
      </div>
    </div>
  )
}

// ===== 4. useToggle 데모 =====
function ToggleDemo() {
  const [isOn, toggle, setOn, setOff] = useToggle(false)
  const [modal, toggleModal] = useToggle(false)
  return (
    <div style={card}>
      <h2 style={{ marginBottom: '0.25rem', color: '#333' }}>🔄 useToggle</h2>
      <p style={{ color: '#9ca3af', fontSize: '0.8rem', fontFamily: 'monospace', marginBottom: '1rem' }}>useToggle(initial) → [state, toggle, setTrue, setFalse]</p>
      {codeBlock(`const [isOn, toggle, setOn, setOff] = useToggle(false)\n// useCallback으로 최적화된 toggle 함수`)}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button onClick={toggle} style={{ padding: '0.6rem 1.2rem', background: isOn ? '#4f46e5' : '#f3f4f6', color: isOn ? 'white' : '#666', border: 'none', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', fontFamily: 'inherit' }}>{isOn ? '🟢 ON' : '⚪ OFF'}</button>
        <button onClick={setOn} style={{ padding: '0.5rem 1rem', background: '#dcfce7', color: '#16a34a', border: 'none', borderRadius: '8px', cursor: 'pointer', fontFamily: 'inherit', fontWeight: '600' }}>setTrue</button>
        <button onClick={setOff} style={{ padding: '0.5rem 1rem', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '8px', cursor: 'pointer', fontFamily: 'inherit', fontWeight: '600' }}>setFalse</button>
        <button onClick={toggleModal} style={{ padding: '0.5rem 1rem', background: '#ede9fe', color: '#4f46e5', border: 'none', borderRadius: '8px', cursor: 'pointer', fontFamily: 'inherit', fontWeight: '600' }}>모달 토글</button>
      </div>
      {modal && (
        <div style={{ marginTop: '1rem', background: '#ede9fe', borderRadius: '10px', padding: '1rem', color: '#4f46e5', fontWeight: '600', textAlign: 'center' }}>
          🎉 useToggle로 열린 모달! <button onClick={toggleModal} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4f46e5', fontWeight: '700' }}>✕</button>
        </div>
      )}
    </div>
  )
}

// ===== 5. useFetch 데모 =====
function FetchDemo() {
  const { data, loading, error, refetch } = useFetch('https://jsonplaceholder.typicode.com/posts?_limit=3')
  return (
    <div style={card}>
      <h2 style={{ marginBottom: '0.25rem', color: '#333' }}>🌐 useFetch</h2>
      <p style={{ color: '#9ca3af', fontSize: '0.8rem', fontFamily: 'monospace', marginBottom: '1rem' }}>{'useFetch(url) → { data, loading, error, refetch }'}</p>
      {codeBlock(`const { data, loading, error, refetch } = useFetch(url)\n// AbortController로 컴포넌트 언마운트 시 요청 취소`)}
      <button onClick={refetch} style={{ padding: '0.5rem 1rem', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontFamily: 'inherit', fontWeight: '600', marginBottom: '0.75rem' }}>새로고침</button>
      {loading && <p style={{ color: '#9ca3af' }}>로딩 중...</p>}
      {error && <p style={{ color: '#dc2626', fontSize: '0.85rem' }}>❌ {error}</p>}
      {data && Array.isArray(data) && data.map((post, i) => (
        <div key={i} style={{ padding: '0.5rem 0', borderBottom: '1px solid #f3f4f6' }}>
          <p style={{ fontWeight: '600', color: '#333', fontSize: '0.85rem' }}>{post.title?.substring(0, 50)}...</p>
        </div>
      ))}
    </div>
  )
}

export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <header style={{ background: '#4f46e5', color: 'white', padding: '1.5rem 2rem' }}>
        <h1>DAY34 — React Custom Hooks</h1>
        <p style={{ opacity: 0.8, fontSize: '0.9rem', marginTop: '0.25rem' }}>useLocalStorage · useDebounce · useWindowSize · useToggle · useFetch</p>
      </header>
      <main style={{ maxWidth: '700px', margin: '2rem auto', padding: '0 1rem' }}>
        <LocalStorageDemo />
        <DebounceDemo />
        <WindowSizeDemo />
        <ToggleDemo />
        <FetchDemo />
      </main>
    </div>
  )
}
