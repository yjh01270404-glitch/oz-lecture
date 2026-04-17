// useFetch - 비동기 데이터 fetching Custom Hook (AbortController 포함)
import { useState, useEffect, useRef } from 'react'

export function useFetch(url, options = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const abortRef = useRef(null)

  const fetchData = async (fetchUrl) => {
    if (!fetchUrl) return
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(fetchUrl, { ...options, signal: controller.signal })
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
      const json = await res.json()
      setData(json)
      setLoading(false)
    } catch (e) {
      if (e.name !== 'AbortError') {
        setError(e.message)
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    fetchData(url)
    return () => abortRef.current?.abort()
  }, [url])

  return { data, loading, error, refetch: () => fetchData(url) }
}
