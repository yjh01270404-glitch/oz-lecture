// DAY33 - Zustand 전역 상태관리 스토어
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export const useCartStore = create(devtools((set, get) => ({
  // State
  items: [],
  isOpen: false,

  // Actions
  addItem: (product) => set(state => {
    const exists = state.items.find(i => i.id === product.id)
    if (exists) return { items: state.items.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i) }
    return { items: [...state.items, { ...product, qty: 1 }] }
  }),

  removeItem: (id) => set(state => ({ items: state.items.filter(i => i.id !== id) })),

  updateQty: (id, qty) => set(state => ({
    items: qty < 1
      ? state.items.filter(i => i.id !== id)
      : state.items.map(i => i.id === id ? { ...i, qty } : i)
  })),

  clearCart: () => set({ items: [] }),
  toggleCart: () => set(state => ({ isOpen: !state.isOpen })),
})))
