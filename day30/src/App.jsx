// DAY30 - React + Firebase Authentication
import { useState, useEffect } from 'react'
import { auth } from './firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'

const inputStyle = {
  width: '100%', padding: '0.75rem 1rem', border: '2px solid #e5e7eb',
  borderRadius: '10px', fontSize: '0.95rem', fontFamily: 'inherit',
  outline: 'none', boxSizing: 'border-box', marginBottom: '0.75rem'
}
const btnStyle = (bg = '#4f46e5') => ({
  width: '100%', padding: '0.75rem', background: bg,
  color: bg === '#f3f4f6' ? '#666' : 'white',
  border: 'none', borderRadius: '10px', fontSize: '1rem',
  fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit', marginBottom: '0.5rem'
})

function AuthForm({ mode, onSwitch }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handle = async () => {
    setError('')
    setLoading(true)
    try {
      if (mode === 'login') {
        await signInWithEmailAndPassword(auth, email, password)
      } else {
        await createUserWithEmailAndPassword(auth, email, password)
      }
    } catch (e) {
      const messages = {
        'auth/user-not-found': '가입된 이메일이 없습니다',
        'auth/wrong-password': '비밀번호가 틀렸습니다',
        'auth/email-already-in-use': '이미 사용중인 이메일입니다',
        'auth/weak-password': '비밀번호는 6자 이상이어야 합니다',
        'auth/invalid-email': '유효하지 않은 이메일입니다',
      }
      setError(messages[e.code] || e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg,#667eea,#764ba2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: 'white', borderRadius: '20px', padding: '2.5rem', width: '400px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🔐</div>
          <h1 style={{ color: '#333', fontSize: '1.5rem' }}>DAY30 — Firebase 인증</h1>
          <p style={{ color: '#999', fontSize: '0.9rem' }}>{mode === 'login' ? '로그인' : '회원가입'}</p>
        </div>
        <input style={inputStyle} type="email" placeholder="이메일" value={email} onChange={e => setEmail(e.target.value)} />
        <input style={inputStyle} type="password" placeholder="비밀번호 (6자 이상)" value={password} onChange={e => setPassword(e.target.value)} />
        {error && <p style={{ color: '#dc2626', fontSize: '0.85rem', marginBottom: '0.75rem', textAlign: 'center' }}>{error}</p>}
        <button style={btnStyle()} onClick={handle} disabled={loading}>
          {loading ? '처리 중...' : mode === 'login' ? '로그인' : '회원가입'}
        </button>
        <button style={btnStyle('#f3f4f6')} onClick={onSwitch}>
          {mode === 'login' ? '계정 없음? 회원가입' : '이미 계정 있음? 로그인'}
        </button>
        <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#f9fafb', borderRadius: '8px', fontSize: '0.8rem', color: '#9ca3af', textAlign: 'center' }}>
          ⚠️ 실제 실행 시 Firebase 프로젝트 설정(.env) 필요
        </div>
      </div>
    </div>
  )
}

function Dashboard({ user }) {
  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <header style={{ background: '#4f46e5', color: 'white', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '1.25rem' }}>🏠 대시보드</h1>
        <button onClick={() => signOut(auth)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', fontFamily: 'inherit' }}>로그아웃</button>
      </header>
      <main style={{ maxWidth: '600px', margin: '3rem auto', padding: '0 1rem', textAlign: 'center' }}>
        <div style={{ background: 'white', borderRadius: '20px', padding: '3rem', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
          <h2 style={{ color: '#333', marginBottom: '0.5rem' }}>로그인 성공!</h2>
          <p style={{ color: '#666', marginBottom: '1.5rem' }}>반갑습니다, {user?.email}</p>
          <div style={{ background: '#f0fdf4', borderRadius: '12px', padding: '1rem', border: '1px solid #bbf7d0' }}>
            <p style={{ color: '#15803d', fontSize: '0.9rem' }}>✅ Firebase Authentication 인증 완료</p>
            <p style={{ color: '#15803d', fontSize: '0.85rem', marginTop: '0.25rem', fontFamily: 'monospace' }}>UID: {user?.uid?.substring(0, 20)}...</p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function App() {
  const [user, setUser] = useState(null)
  const [mode, setMode] = useState('login')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => { setUser(u); setLoading(false) })
    return unsub
  }, [])

  if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p>로딩 중...</p></div>
  if (user) return <Dashboard user={user} />
  return <AuthForm mode={mode} onSwitch={() => setMode(m => m === 'login' ? 'register' : 'login')} />
}
