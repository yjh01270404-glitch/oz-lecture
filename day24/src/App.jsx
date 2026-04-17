// DAY24 - React 기초와 JSX 컴포넌트
import { useState } from 'react'

function Header({ title }) {
  return (
    <header style={{ background: '#4f46e5', color: 'white', padding: '1.5rem 2rem' }}>
      <h1>{title}</h1>
    </header>
  )
}

function Card({ emoji, title, description }) {
  const [liked, setLiked] = useState(false)
  return (
    <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', marginBottom: '1rem', border: liked ? '2px solid #4f46e5' : '2px solid transparent', transition: 'border 0.2s' }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{emoji}</div>
      <h2 style={{ color: '#333', marginBottom: '0.5rem' }}>{title}</h2>
      <p style={{ color: '#666', lineHeight: '1.7', marginBottom: '1rem' }}>{description}</p>
      <button
        onClick={() => setLiked(!liked)}
        style={{ background: liked ? '#4f46e5' : '#f3f4f6', color: liked ? 'white' : '#666', border: 'none', padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.9rem' }}
      >
        {liked ? '❤️ 좋아요 취소' : '🤍 좋아요'}
      </button>
    </div>
  )
}

function SkillBadge({ name }) {
  return (
    <span style={{ display: 'inline-block', background: '#e0e7ff', color: '#4f46e5', padding: '0.35rem 0.9rem', borderRadius: '20px', margin: '0.25rem', fontSize: '0.9rem', fontWeight: '500' }}>
      {name}
    </span>
  )
}

function Footer() {
  return (
    <footer style={{ textAlign: 'center', padding: '2rem', color: '#aaa', borderTop: '1px solid #e5e7eb', marginTop: '2rem' }}>
      <p>DAY24 — React 기초와 JSX 컴포넌트 | 1인 창업가 개발 부트캠프 4기</p>
    </footer>
  )
}

export default function App() {
  const cards = [
    { emoji: '✨', title: 'JSX란?', description: 'JSX는 JavaScript 안에서 HTML과 유사한 문법을 사용하는 확장 문법입니다. Babel이 React.createElement()로 변환합니다.' },
    { emoji: '🧩', title: '컴포넌트란?', description: 'UI를 독립적이고 재사용 가능한 단위로 분리한 것입니다. 함수 컴포넌트는 JSX를 반환하는 JavaScript 함수입니다.' },
    { emoji: '📦', title: 'Props란?', description: '부모에서 자식으로 데이터를 전달하는 방법입니다. Props는 읽기 전용이며 단방향으로 흐릅니다.' },
  ]
  const skills = ['React 18', 'JSX', 'Vite', 'Props 패턴', 'ES Module']

  return (
    <div style={{ minHeight: '100vh' }}>
      <Header title="DAY24 — React 기초와 JSX 컴포넌트" />
      <main style={{ maxWidth: '700px', margin: '2rem auto', padding: '0 1rem' }}>
        {cards.map((c, i) => <Card key={i} {...c} />)}
        <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h2 style={{ marginBottom: '1rem' }}>🎯 학습 스킬</h2>
          {skills.map((s, i) => <SkillBadge key={i} name={s} />)}
        </div>
      </main>
      <Footer />
    </div>
  )
}
