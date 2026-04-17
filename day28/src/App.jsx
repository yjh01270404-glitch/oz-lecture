// DAY28 - React 스타일링 (CSS 클래스 / Inline / 동적 스타일)
import { useState } from 'react'
import './index.css'

// index.css에 .btn, .card, .badge 클래스가 정의되어 있음
// 여기서는 CSS 클래스 + Inline 스타일의 혼용을 시연합니다

function ButtonSection() {
  const [active, setActive] = useState(null)
  const variants = [
    { cls: 'btn-primary', label: 'Primary', bg: '#4f46e5' },
    { cls: 'btn-secondary', label: 'Secondary', bg: '#f3f4f6' },
    { cls: 'btn-danger', label: 'Danger', bg: '#fee2e2' },
  ]
  return (
    <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', marginBottom: '1rem' }}>
      <h3 style={{ color: '#333', marginBottom: '1rem' }}>🎨 CSS 클래스 스타일링</h3>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        {variants.map(({ cls, label }) => (
          <button key={cls} onClick={() => setActive(cls)} className={`btn ${cls}`} style={{ outline: active === cls ? '3px solid #333' : 'none' }}>
            {label}
          </button>
        ))}
      </div>
      <p style={{ marginTop: '0.75rem', color: '#999', fontSize: '0.85rem' }}>hover 시 transform lift 효과 (.btn:hover)</p>
    </div>
  )
}

function BadgeSection() {
  const [selected, setSelected] = useState('blue')
  const badges = [['blue', '정보', 'badge-blue'], ['green', '성공', 'badge-green'], ['red', '위험', 'badge-red'], ['yellow', '경고', 'badge-yellow']]
  return (
    <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', marginBottom: '1rem' }}>
      <h3 style={{ color: '#333', marginBottom: '1rem' }}>🏷️ 동적 클래스 배지</h3>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {badges.map(([k, l, cls]) => (
          <button key={k} onClick={() => setSelected(k)} className={`badge ${cls}`} style={{ border: selected === k ? '2px solid currentColor' : '2px solid transparent', cursor: 'pointer' }}>{l}</button>
        ))}
      </div>
      <p style={{ marginTop: '0.75rem', color: '#666' }}>
        선택: <span className={`badge ${badges.find(b => b[0] === selected)?.[2]}`}>{badges.find(b => b[0] === selected)?.[1]}</span>
      </p>
    </div>
  )
}

function InlineStyleSection() {
  const [bg, setBg] = useState('#4f46e5')
  const [text, setText] = useState('#ffffff')
  const [radius, setRadius] = useState(12)
  return (
    <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', marginBottom: '1rem' }}>
      <h3 style={{ color: '#333', marginBottom: '1rem' }}>🖌️ Inline 동적 스타일</h3>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.85rem', color: '#666' }}>
          배경색 <input type="color" value={bg} onChange={e => setBg(e.target.value)} style={{ width: '60px', height: '30px', border: 'none', cursor: 'pointer' }} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.85rem', color: '#666' }}>
          글자색 <input type="color" value={text} onChange={e => setText(e.target.value)} style={{ width: '60px', height: '30px', border: 'none', cursor: 'pointer' }} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.85rem', color: '#666' }}>
          모서리: {radius}px <input type="range" min="0" max="50" value={radius} onChange={e => setRadius(Number(e.target.value))} style={{ width: '120px' }} />
        </label>
      </div>
      {/* Inline style로 동적으로 스타일 변경 */}
      <div style={{ background: bg, color: text, borderRadius: `${radius}px`, padding: '1.5rem', textAlign: 'center', fontWeight: '700', fontSize: '1.1rem', transition: 'all 0.3s' }}>
        동적 Inline 스타일 미리보기
      </div>
    </div>
  )
}

function GridSection() {
  const items = ['CSS 클래스', 'Inline Style', '동적 클래스', 'CSS 변수', 'transition', ':hover 효과']
  return (
    <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
      <h3 style={{ color: '#333', marginBottom: '1rem' }}>📦 CSS Grid 레이아웃</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
        {items.map((item, i) => (
          <div key={i} style={{ background: `hsl(${i * 40 + 220},70%,95%)`, color: `hsl(${i * 40 + 220},60%,35%)`, padding: '1rem', borderRadius: '10px', textAlign: 'center', fontWeight: '600', fontSize: '0.9rem' }}>{item}</div>
        ))}
      </div>
    </div>
  )
}

export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <header style={{ background: '#4f46e5', color: 'white', padding: '1.5rem 2rem' }}>
        <h1>DAY28 — React 스타일링</h1>
        <p style={{ opacity: 0.8, marginTop: '0.25rem', fontSize: '0.9rem' }}>CSS 클래스 · Inline Style · 동적 스타일링 · CSS Grid</p>
      </header>
      <main style={{ maxWidth: '700px', margin: '2rem auto', padding: '0 1rem' }}>
        <ButtonSection />
        <BadgeSection />
        <InlineStyleSection />
        <GridSection />
      </main>
    </div>
  )
}
