// DAY29 - React UI 라이브러리 활용 (커스텀 컴포넌트 시스템)
import { useState } from 'react'

const PRIMARY = '#4f46e5'
const DANGER = '#dc2626'

// ===== 재사용 가능한 UI 컴포넌트들 =====

function Button({ children, variant = 'primary', size = 'md', disabled, onClick, icon }) {
  const v = {
    primary: { bg: PRIMARY, color: 'white', border: 'none' },
    outline: { bg: 'transparent', color: PRIMARY, border: `2px solid ${PRIMARY}` },
    ghost: { bg: 'transparent', color: PRIMARY, border: 'none' },
    danger: { bg: DANGER, color: 'white', border: 'none' },
  }[variant] || {}
  const sz = { sm: '0.4rem 0.9rem', md: '0.6rem 1.4rem', lg: '0.8rem 2rem' }[size]
  return (
    <button onClick={onClick} disabled={disabled} style={{ padding: sz, ...v, borderRadius: '10px', fontFamily: 'inherit', fontSize: size === 'sm' ? '0.85rem' : size === 'lg' ? '1.05rem' : '0.95rem', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1, transition: 'all 0.2s', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontWeight: '600' }}>
      {icon && <span>{icon}</span>}{children}
    </button>
  )
}

function Input({ label, placeholder, value, onChange, type = 'text', error, prefix }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      {label && <label style={{ display: 'block', marginBottom: '0.4rem', fontWeight: '600', fontSize: '0.9rem', color: '#374151' }}>{label}</label>}
      <div style={{ position: 'relative' }}>
        {prefix && <span style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}>{prefix}</span>}
        <input type={type} placeholder={placeholder} value={value} onChange={onChange} style={{ width: '100%', padding: `0.65rem ${prefix ? '2.5rem' : '1rem'}`, border: `2px solid ${error ? DANGER : '#e5e7eb'}`, borderRadius: '10px', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', transition: 'border 0.2s' }} />
      </div>
      {error && <p style={{ color: DANGER, fontSize: '0.8rem', marginTop: '0.25rem' }}>{error}</p>}
    </div>
  )
}

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={onClose}>
      <div style={{ background: 'white', borderRadius: '20px', padding: '2rem', maxWidth: '480px', width: '90%', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.2rem', color: '#111' }}>{title}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: '#9ca3af' }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  )
}

function Alert({ type = 'info', title, message }) {
  const t = {
    info: { bg: '#eff6ff', border: '#bfdbfe', color: '#1d4ed8', icon: 'ℹ️' },
    success: { bg: '#f0fdf4', border: '#bbf7d0', color: '#15803d', icon: '✅' },
    warning: { bg: '#fffbeb', border: '#fde68a', color: '#b45309', icon: '⚠️' },
    error: { bg: '#fef2f2', border: '#fecaca', color: DANGER, icon: '❌' },
  }[type] || {}
  return (
    <div style={{ background: t.bg, border: `1px solid ${t.border}`, borderRadius: '10px', padding: '0.875rem 1rem', marginBottom: '0.75rem', display: 'flex', gap: '0.75rem' }}>
      <span>{t.icon}</span>
      <div><p style={{ fontWeight: '600', color: t.color, fontSize: '0.9rem' }}>{title}</p><p style={{ color: t.color, fontSize: '0.85rem', opacity: 0.85 }}>{message}</p></div>
    </div>
  )
}

// ===== 메인 앱 =====
export default function App() {
  const [modal, setModal] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [emailErr, setEmailErr] = useState('')

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <header style={{ background: PRIMARY, color: 'white', padding: '1.5rem 2rem' }}>
        <h1>DAY29 — React UI 라이브러리 활용</h1>
        <p style={{ opacity: 0.8, fontSize: '0.9rem', marginTop: '0.25rem' }}>Button · Input · Modal · Alert 커스텀 컴포넌트</p>
      </header>
      <main style={{ maxWidth: '700px', margin: '2rem auto', padding: '0 1rem' }}>

        {/* Button 쇼케이스 */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#333', marginBottom: '1.25rem', fontSize: '1.1rem' }}>🔘 Button 컴포넌트</h2>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
            <Button variant="primary" icon="🚀">Primary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger" icon="🗑">Danger</Button>
            <Button variant="primary" disabled>Disabled</Button>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="md">Medium</Button>
            <Button variant="primary" size="lg">Large</Button>
          </div>
        </div>

        {/* Alert 쇼케이스 */}
        <Alert type="info" title="정보" message="UI 컴포넌트 라이브러리를 활용하면 일관된 디자인을 유지할 수 있습니다." />
        <Alert type="success" title="성공" message="MUI, Ant Design, Chakra UI 등이 대표적인 React UI 라이브러리입니다." />
        <Alert type="warning" title="주의" message="외부 라이브러리 사용 시 번들 크기와 라이선스를 확인하세요." />

        {/* Input + Modal */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', marginTop: '1.5rem' }}>
          <h2 style={{ color: '#333', marginBottom: '1.25rem', fontSize: '1.1rem' }}>📝 Input + Modal 컴포넌트</h2>
          <Input label="이름" placeholder="이름 입력" value={name} onChange={e => setName(e.target.value)} prefix="👤" />
          <Input
            label="이메일" placeholder="email@example.com" type="email"
            value={email} onChange={e => { setEmail(e.target.value); setEmailErr(e.target.value.includes('@') ? '' : '올바른 이메일 형식이 아닙니다') }}
            error={emailErr} prefix="✉️"
          />
          <Button variant="primary" onClick={() => { if (name && email && !emailErr) setModal(true) }}>모달 열기</Button>
        </div>
      </main>

      <Modal isOpen={modal} onClose={() => setModal(false)} title="제출 완료">
        <Alert type="success" title="성공!" message={`${name}(${email})님의 정보가 제출되었습니다.`} />
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
          <Button variant="primary" onClick={() => setModal(false)}>확인</Button>
        </div>
      </Modal>
    </div>
  )
}
