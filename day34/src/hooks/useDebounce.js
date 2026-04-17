// useDebounce - 입력값 딜레이 처리 Custom Hook
import { useState, useEffect } from 'react'

export function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debounced
}
