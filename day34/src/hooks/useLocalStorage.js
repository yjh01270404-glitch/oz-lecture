// useLocalStorage - localStorage와 동기화되는 상태 관리 Custom Hook
import { useState, useEffect } from 'react'

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try { window.localStorage.setItem(key, JSON.stringify(value)) }
    catch (e) { console.error('localStorage 저장 실패:', e) }
  }, [key, value])

  const remove = () => {
    try { window.localStorage.removeItem(key); setValue(initialValue) }
    catch (e) { console.error('localStorage 삭제 실패:', e) }
  }

  return [value, setValue, remove]
}
