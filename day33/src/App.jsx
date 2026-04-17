// DAY33 - Redux & Zustand 기초 실습 (Zustand 쇼핑 카트)
import { useCartStore } from './store/useCartStore'

const products = [
  { id: 1, name: 'MacBook Pro 14"', price: 2490000, emoji: '💻', category: '노트북' },
  { id: 2, name: 'AirPods Pro', price: 359000, emoji: '🎧', category: '오디오' },
  { id: 3, name: 'iPad Air', price: 899000, emoji: '📱', category: '태블릿' },
  { id: 4, name: 'Apple Watch', price: 599000, emoji: '⌚', category: '웨어러블' },
  { id: 5, name: 'Magic Keyboard', price: 189000, emoji: '⌨️', category: '액세서리' },
  { id: 6, name: 'MagSafe 충전기', price: 55000, emoji: '🔌', category: '액세서리' },
]

function Navbar() {
  const { items, toggleCart } = useCartStore()
  const count = items.reduce((s, i) => s + i.qty, 0)
  return (
    <nav style={{ background: '#1a1a2e', color: 'white', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
      <h1 style={{ fontSize: '1.25rem', fontWeight: '700' }}>🛍 DAY33 Zustand Shop</h1>
      <button onClick={toggleCart} style={{ background: '#4f46e5', border: 'none', color: 'white', padding: '0.6rem 1.2rem', borderRadius: '10px', cursor: 'pointer', fontFamily: 'inherit', fontWeight: '600' }}>
        🛒 {count > 0 ? `장바구니 (${count})` : '장바구니'}
      </button>
    </nav>
  )
}

function ProductCard({ product }) {
  const { items, addItem } = useCartStore()
  const inCart = items.find(i => i.id === product.id)
  return (
    <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
      <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>{product.emoji}</div>
      <span style={{ display: 'inline-block', background: '#ede9fe', color: '#4f46e5', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600', marginBottom: '0.5rem' }}>{product.category}</span>
      <h3 style={{ color: '#111', marginBottom: '0.25rem', fontSize: '1rem' }}>{product.name}</h3>
      <p style={{ color: '#4f46e5', fontWeight: '700', fontSize: '1.1rem', marginBottom: '1rem' }}>{product.price.toLocaleString()}원</p>
      <button
        onClick={() => addItem(product)}
        style={{ width: '100%', padding: '0.6rem', background: inCart ? '#f0fdf4' : '#4f46e5', color: inCart ? '#16a34a' : 'white', border: inCart ? '2px solid #16a34a' : 'none', borderRadius: '10px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }}
      >
        {inCart ? `✅ 추가됨 (${inCart.qty})` : '장바구니 추가'}
      </button>
    </div>
  )
}

function CartDrawer() {
  const { items, isOpen, toggleCart, updateQty, removeItem, clearCart } = useCartStore()
  const total = items.reduce((s, i) => s + i.price * i.qty, 0)
  if (!isOpen) return null
  return (
    <>
      <div onClick={toggleCart} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200 }} />
      <div style={{ position: 'fixed', right: 0, top: 0, bottom: 0, width: '360px', background: 'white', zIndex: 201, boxShadow: '-8px 0 32px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ color: '#111', fontSize: '1.2rem' }}>🛒 장바구니</h2>
          <button onClick={toggleCart} style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: '#9ca3af' }}>✕</button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
          {items.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#bbb', padding: '3rem 0' }}>장바구니가 비어있습니다</p>
          ) : items.map(item => (
            <div key={item.id} style={{ display: 'flex', gap: '0.75rem', padding: '0.75rem 0', borderBottom: '1px solid #f9fafb', alignItems: 'center' }}>
              <span style={{ fontSize: '1.5rem' }}>{item.emoji}</span>
              <div style={{ flex: 1 }}>
                <p style={{ color: '#111', fontWeight: '600', fontSize: '0.9rem' }}>{item.name}</p>
                <p style={{ color: '#4f46e5', fontSize: '0.85rem' }}>{item.price.toLocaleString()}원</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <button onClick={() => updateQty(item.id, item.qty - 1)} style={{ width: '26px', height: '26px', border: '1px solid #e5e7eb', borderRadius: '6px', background: '#f9fafb', cursor: 'pointer' }}>-</button>
                <span style={{ minWidth: '20px', textAlign: 'center', fontWeight: '600' }}>{item.qty}</span>
                <button onClick={() => updateQty(item.id, item.qty + 1)} style={{ width: '26px', height: '26px', border: '1px solid #e5e7eb', borderRadius: '6px', background: '#f9fafb', cursor: 'pointer' }}>+</button>
                <button onClick={() => removeItem(item.id)} style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer', marginLeft: '0.25rem' }}>🗑</button>
              </div>
            </div>
          ))}
        </div>
        {items.length > 0 && (
          <div style={{ padding: '1.5rem', borderTop: '1px solid #f3f4f6' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ fontWeight: '700', color: '#111' }}>합계</span>
              <span style={{ fontWeight: '700', color: '#4f46e5', fontSize: '1.1rem' }}>{total.toLocaleString()}원</span>
            </div>
            <button style={{ width: '100%', padding: '0.85rem', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', marginBottom: '0.5rem', fontFamily: 'inherit', fontSize: '1rem' }}>결제하기</button>
            <button onClick={clearCart} style={{ width: '100%', padding: '0.6rem', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '10px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit' }}>장바구니 비우기</button>
          </div>
        )}
      </div>
    </>
  )
}

export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <Navbar />
      <main style={{ maxWidth: '1000px', margin: '2rem auto', padding: '0 1rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#111', marginBottom: '0.25rem' }}>상품 목록</h2>
          <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>Zustand 전역 상태관리 · create / set / get</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </main>
      <CartDrawer />
    </div>
  )
}
