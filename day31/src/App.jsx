// DAY31 - Firebase Hosting & Firestore CRUD
import { useState, useEffect } from 'react'
import { db } from './firebase'
import {
  collection, addDoc, onSnapshot, doc,
  updateDoc, deleteDoc, serverTimestamp, query, orderBy
} from 'firebase/firestore'

const colRef = collection(db, 'todos')

export default function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  const [error, setError] = useState('')

  // 실시간 Firestore 리스너
  useEffect(() => {
    const q = query(colRef, orderBy('createdAt', 'desc'))
    const unsub = onSnapshot(q,
      snap => setTodos(snap.docs.map(d => ({ id: d.id, ...d.data() }))),
      err => setError('Firestore 연결 실패: Firebase 프로젝트 설정(.env)을 확인하세요.')
    )
    return unsub
  }, [])

  const add = async () => {
    if (!input.trim()) return
    try {
      await addDoc(colRef, { text: input.trim(), done: false, createdAt: serverTimestamp() })
      setInput('')
    } catch (e) { setError(e.message) }
  }

  const toggle = async (id, done) => {
    try { await updateDoc(doc(db, 'todos', id), { done: !done }) }
    catch (e) { setError(e.message) }
  }

  const remove = async (id) => {
    try { await deleteDoc(doc(db, 'todos', id)) }
    catch (e) { setError(e.message) }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <header style={{ background: '#4f46e5', color: 'white', padding: '1.5rem 2rem' }}>
        <h1>DAY31 — Firebase Firestore CRUD</h1>
        <p style={{ opacity: 0.8, fontSize: '0.9rem', marginTop: '0.25rem' }}>실시간 DB · Create · Read · Update · Delete</p>
      </header>
      <main style={{ maxWidth: '600px', margin: '2rem auto', padding: '0 1rem' }}>
        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', padding: '1rem', marginBottom: '1rem', color: '#dc2626', fontSize: '0.85rem' }}>⚠️ {error}</div>
        )}

        {/* CRUD 인터페이스 */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', marginBottom: '1.5rem' }}>
          <h2 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>📋 Firestore 실시간 Todo</h2>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            <input
              value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && add()}
              placeholder="할 일 입력 (Firestore에 저장됩니다)"
              style={{ flex: 1, padding: '0.7rem 1rem', border: '2px solid #e5e7eb', borderRadius: '10px', fontSize: '0.95rem', outline: 'none', fontFamily: 'inherit' }}
            />
            <button onClick={add} style={{ padding: '0.7rem 1.2rem', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '10px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' }}>추가</button>
          </div>
          {todos.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#bbb', padding: '2rem' }}>할 일을 추가해보세요!</p>
          ) : (
            <ul style={{ listStyle: 'none' }}>
              {todos.map(t => (
                <li key={t.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 0', borderBottom: '1px solid #f3f4f6' }}>
                  <input type="checkbox" checked={t.done || false} onChange={() => toggle(t.id, t.done)} style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                  <span style={{ flex: 1, textDecoration: t.done ? 'line-through' : 'none', color: t.done ? '#bbb' : '#333' }}>{t.text}</span>
                  <button onClick={() => remove(t.id)} style={{ background: 'none', border: 'none', color: '#e5e7eb', cursor: 'pointer', fontSize: '1.1rem' }}>✕</button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Firestore 보안 규칙 예시 */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
          <h2 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>🔒 Firestore 보안 규칙</h2>
          <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '10px', fontSize: '0.8rem', overflowX: 'auto', lineHeight: '1.6' }}>{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 인증된 사용자만 todos 컬렉션 접근
    match /todos/{todoId} {
      allow read, write: if request.auth != null;
    }
  }
}`}</pre>
        </div>
      </main>
    </div>
  )
}
