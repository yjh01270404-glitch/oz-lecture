import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from '@/styles/Page.module.css'

/**
 * CSR (Client Side Rendering) 예제 페이지
 *
 * - 페이지는 빈 HTML로 전송되고, JS가 로드된 후 브라우저에서 데이터를 패칭합니다.
 * - useEffect + fetch를 사용하여 클라이언트에서 API 호출
 * - 단점: SEO 불리, 초기 로딩 느림 (빈 화면 깜빡임)
 * - 장점: 서버 부하 없음, 동적 상호작용에 적합
 */
export default function CSRPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // 컴포넌트 마운트 후 클라이언트에서 데이터 패칭
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        // 공개 API로 데이터 패칭
        const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
        if (!res.ok) throw new Error('데이터를 불러오지 못했습니다.')
        const data = await res.json()
        setPosts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, []) // 빈 배열 = 마운트 시 1회 실행

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backBtn}>← 홈으로</Link>

      <div className={styles.badge} style={{ background: '#3b82f6' }}>CSR</div>
      <h1 className={styles.title}>🌐 Client Side Rendering</h1>

      <div className={styles.infoBox}>
        <h3>동작 방식</h3>
        <ol>
          <li>서버는 빈 HTML + JS 번들만 전송</li>
          <li>브라우저가 JS를 파싱 & 실행</li>
          <li><code>useEffect</code>에서 API 호출</li>
          <li>응답 데이터로 DOM 업데이트</li>
        </ol>
        <p className={styles.code}>사용: <code>useEffect + fetch</code></p>
      </div>

      <h2>게시글 목록 (API 패칭 결과)</h2>

      {loading && (
        <div className={styles.loading}>
          🔄 클라이언트에서 데이터 로딩 중...
        </div>
      )}

      {error && (
        <div className={styles.error}>❌ {error}</div>
      )}

      {!loading && !error && (
        <ul className={styles.list}>
          {posts.map((post) => (
            <li key={post.id} className={styles.listItem}>
              <span className={styles.itemId}>#{post.id}</span>
              <div>
                <strong>{post.title}</strong>
                <p>{post.body.slice(0, 80)}...</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
