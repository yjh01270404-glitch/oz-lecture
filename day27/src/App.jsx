// DAY27 - React Router를 이용한 라우팅
import { BrowserRouter, Routes, Route, NavLink, useParams, useNavigate } from 'react-router-dom'

const posts = [
  { id: 1, title: 'BrowserRouter 설정', content: 'BrowserRouter로 전체 앱을 감싸 라우팅 컨텍스트를 제공합니다. HTML5 History API를 사용해 URL을 관리합니다.' },
  { id: 2, title: 'Routes와 Route', content: 'Routes 내부에 Route를 정의합니다. path로 URL 경로, element로 렌더링할 컴포넌트를 지정합니다.' },
  { id: 3, title: 'useParams 훅', content: 'URL 파라미터(:id)를 useParams()로 읽어옵니다. 동적 라우팅에 필수적인 훅입니다.' },
  { id: 4, title: 'NavLink 컴포넌트', content: '활성 경로에 자동으로 active 클래스를 추가합니다. 네비게이션 상태 표현에 유용합니다.' },
]

function Navbar() {
  const s = ({ isActive }) => ({
    color: isActive ? 'white' : 'rgba(255,255,255,0.65)',
    textDecoration: 'none', padding: '0.5rem 1.2rem', borderRadius: '8px',
    background: isActive ? 'rgba(255,255,255,0.2)' : 'transparent',
    fontWeight: isActive ? '700' : '400', transition: 'all 0.2s'
  })
  return (
    <nav style={{ background: '#4f46e5', padding: '1rem 2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 2px 8px rgba(79,70,229,0.4)' }}>
      <span style={{ color: 'white', fontWeight: '700', fontSize: '1.2rem', marginRight: 'auto' }}>DAY27</span>
      <NavLink to="/" end style={s}>홈</NavLink>
      <NavLink to="/about" style={s}>소개</NavLink>
      <NavLink to="/posts" style={s}>블로그</NavLink>
      <NavLink to="/contact" style={s}>연락처</NavLink>
    </nav>
  )
}

function Home() {
  const nav = useNavigate()
  return (
    <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏠</div>
      <h2 style={{ fontSize: '2rem', color: '#333', marginBottom: '1rem' }}>React Router v6</h2>
      <p style={{ color: '#666', lineHeight: '1.8', maxWidth: '500px', margin: '0 auto 2rem' }}>BrowserRouter, Routes, Route, NavLink, useParams, useNavigate를 활용한 SPA 라우팅 예제입니다.</p>
      <button onClick={() => nav('/posts')} style={{ padding: '0.75rem 2rem', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '10px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer' }}>📝 블로그 보기</button>
    </div>
  )
}

function About() {
  return (
    <div style={{ maxWidth: '600px', margin: '3rem auto', padding: '0 1rem' }}>
      <h2 style={{ color: '#4f46e5', marginBottom: '1.5rem' }}>ℹ️ 소개</h2>
      {[
        { icon: '🧭', title: 'SPA 라우팅', desc: '페이지 새로고침 없이 URL을 변경하며 컴포넌트를 교체합니다.' },
        { icon: '⚡', title: '빠른 네비게이션', desc: 'HTML5 History API를 사용해 브라우저 히스토리를 관리합니다.' },
        { icon: '🔗', title: '동적 라우팅', desc: ':id 같은 URL 파라미터로 동적 경로를 처리합니다.' },
      ].map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: '1rem', padding: '1rem', background: 'white', borderRadius: '12px', marginBottom: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <span style={{ fontSize: '2rem' }}>{item.icon}</span>
          <div><h3 style={{ color: '#333', marginBottom: '0.25rem' }}>{item.title}</h3><p style={{ color: '#666' }}>{item.desc}</p></div>
        </div>
      ))}
    </div>
  )
}

function Posts() {
  const nav = useNavigate()
  return (
    <div style={{ maxWidth: '600px', margin: '3rem auto', padding: '0 1rem' }}>
      <h2 style={{ color: '#4f46e5', marginBottom: '1.5rem' }}>📝 블로그</h2>
      {posts.map(p => (
        <div key={p.id} onClick={() => nav(`/posts/${p.id}`)} style={{ background: 'white', borderRadius: '12px', padding: '1.25rem', marginBottom: '0.75rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', cursor: 'pointer' }}>
          <h3 style={{ color: '#333', marginBottom: '0.25rem' }}>{p.title}</h3>
          <p style={{ color: '#999', fontSize: '0.85rem' }}>클릭하여 읽기 →</p>
        </div>
      ))}
    </div>
  )
}

function PostDetail() {
  const { id } = useParams()
  const nav = useNavigate()
  const post = posts.find(p => p.id === Number(id))
  if (!post) return <div style={{ textAlign: 'center', padding: '4rem' }}><p style={{ color: '#999' }}>포스트를 찾을 수 없습니다.</p></div>
  return (
    <div style={{ maxWidth: '600px', margin: '3rem auto', padding: '0 1rem' }}>
      <button onClick={() => nav(-1)} style={{ background: 'none', border: 'none', color: '#4f46e5', fontWeight: '600', cursor: 'pointer', marginBottom: '1.5rem' }}>← 뒤로</button>
      <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        <p style={{ color: '#4f46e5', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem' }}>POST #{id}</p>
        <h2 style={{ color: '#333', marginBottom: '1rem' }}>{post.title}</h2>
        <p style={{ color: '#555', lineHeight: '1.8' }}>{post.content}</p>
      </div>
    </div>
  )
}

function Contact() {
  return (
    <div style={{ maxWidth: '500px', margin: '3rem auto', padding: '0 1rem', textAlign: 'center' }}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📞</div>
      <h2 style={{ color: '#4f46e5', marginBottom: '1.5rem' }}>연락처</h2>
      <div style={{ background: 'white', borderRadius: '12px', padding: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <p style={{ color: '#666', marginBottom: '0.5rem' }}>📧 yjh01270404@gmail.com</p>
        <p style={{ color: '#666' }}>🏫 1인 창업가 개발 부트캠프 4기</p>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<div style={{ textAlign: 'center', padding: '4rem' }}><h2>404 — 페이지 없음</h2></div>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
