// DAY32 - React Context API (테마 컨텍스트 + 장바구니 컨텍스트)
import { createContext, useContext, useState, useReducer } from 'react'

// ===== 1. Theme Context =====
const ThemeContext = createContext()

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')
  const colors = {
    light: { bg: '#f8f9fa', surface: 'white', text: '#111', sub: '#666', border: '#e5e7eb' },
    dark:  { bg: '#111827', surface: '#1f2937', text: '#f9fafb', sub: '#9ca3af', border: '#374151' },
  }
  return (
    <ThemeContext.Provider value={{ theme, toggle: () => setTheme(t => t === 'light' ? 'dark' : 'light'), colors: colors[theme] }}>
      {children}
    </ThemeContext.Provider>
  )
}
const useTheme = () => useContext(ThemeContext)

// ===== 2. Cart Context (useReducer 패턴) =====
const CartContext = createContext()

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return state.find(i => i.id === action.item.id)
        ? state.map(i => i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i)
        : [...state, { ...action.item, qty: 1 }]
    case 'REMOVE': return state.filter(i => i.id !== action.id)
    case 'CLEAR': return []
    default: return state
  }
}

function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, [])
  return (
    <CartContext.Provider value={{ cart, dispatch, total: cart.reduce((s, i) => s + i.price * i.qty, 0) }}>
      {children}
    </CartContext.Provider>
  )
}
const useCart = () => useContext(CartContext)

// ===== UI 컴포넌트 =====
const products = [
  { id: 1, name: 'React 교과서', price: 32000, emoji: '📚' },
  { id: 2, name: 'JavaScript 심화', price: 28000, emoji: '⚡' },
  { id: 3, name: 'TypeScript 완벽가이드', price: 35000, emoji: '🔷' },
]

function Header() {
  const { theme, toggle } = useTheme()
  const { cart } = useCart()
  const count = cart.reduce((s, i) => s + i.qty, 0)
  return (
    <header style={{ background: '#4f46e5', color: 'white', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <h1 style={{ fontSize: '1.2rem' }}>DAY32 — Context API</h1>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <button onClick={toggle} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '0.4rem 1rem', borderRadius: '8px', cursor: 'pointer', fontFamily: 'inherit' }}>
          {theme === 'light' ? '🌙 다크' : '☀️ 라이트'}
        </button>
        <span style={{ background: 'rgba(255,255,255,0.2)', padding: '0.4rem 0.8rem', borderRadius: '8px', fontWeight: '700' }}>🛒 {count}</span>
      </div>
    </header>
  )
}

function ProductList() {
  const { colors } = useTheme()
  const { cart, dispatch } = useCart()
  const inCart = id => cart.find(i => i.id === id)
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
      {products.map(p => (
        <div key={p.id} style={{ background: colors.surface, borderRadius: '12px', padding: '1.25rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', border: `1px solid ${colors.border}`, transition: 'all 0.2s' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{p.emoji}</div>
          <h3 style={{ color: colors.text, marginBottom: '0.25rem', fontSize: '1rem' }}>{p.name}</h3>
          <p style={{ color: '#4f46e5', fontWeight: '700', marginBottom: '0.75rem' }}>{p.price.toLocaleString()}원</p>
          <button
            onClick={() => dispatch({ type: 'ADD', item: p })}
            style={{ width: '100%', padding: '0.5rem', background: inCart(p.id) ? '#dcfce7' : '#4f46e5', color: inCart(p.id) ? '#16a34a' : 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' }}
          >
            {inCart(p.id) ? `✅ 담음 (${inCart(p.id).qty})` : '장바구니 담기'}
          </button>
        </div>
      ))}
    </div>
  )
}

function CartView() {
  const { colors } = useTheme()
  const { cart, dispatch, total } = useCart()
  return (
    <div style={{ background: colors.surface, borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', border: `1px solid ${colors.border}` }}>
      <h2 style={{ color: colors.text, marginBottom: '1rem', fontSize: '1.1rem' }}>🛒 장바구니 (useContext)</h2>
      {cart.length === 0 ? (
        <p style={{ color: colors.sub, textAlign: 'center', padding: '1rem' }}>비어있습니다</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0', borderBottom: `1px solid ${colors.border}` }}>
              <span style={{ color: colors.text }}>{item.emoji} {item.name} × {item.qty}</span>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{ color: '#4f46e5', fontWeight: '700' }}>{(item.price * item.qty).toLocaleString()}원</span>
                <button onClick={() => dispatch({ type: 'REMOVE', id: item.id })} style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer' }}>✕</button>
              </div>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', paddingTop: '1rem', borderTop: `2px solid ${colors.border}` }}>
            <span style={{ color: colors.text, fontWeight: '700' }}>합계: {total.toLocaleString()}원</span>
            <button onClick={() => dispatch({ type: 'CLEAR' })} style={{ padding: '0.4rem 1rem', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '8px', cursor: 'pointer', fontFamily: 'inherit' }}>비우기</button>
          </div>
        </>
      )}
    </div>
  )
}

function AppContent() {
  const { colors } = useTheme()
  return (
    <div style={{ minHeight: '100vh', background: colors.bg, transition: 'background 0.3s' }}>
      <Header />
      <main style={{ maxWidth: '700px', margin: '2rem auto', padding: '0 1rem' }}>
        <ProductList />
        <CartView />
      </main>
    </div>
  )
}

// createContext & Provider를 최상단에서 래핑
export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </ThemeProvider>
  )
}
