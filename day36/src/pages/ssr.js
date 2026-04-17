import Link from 'next/link'
import styles from '@/styles/Page.module.css'

/**
 * SSR (Server Side Rendering) 예제 페이지
 *
 * - 매 요청마다 서버에서 getServerSideProps가 실행됩니다.
 * - 서버에서 데이터를 패칭한 후 완성된 HTML을 클라이언트에 전송합니다.
 * - 장점: SEO 유리, 항상 최신 데이터
 * - 단점: 서버 부하↑, TTFB(첫 바이트 시간) 느림
 */
export default function SSRPage({ posts, fetchedAt, serverTime }) {
  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backBtn}>← 홈으로</Link>

      <div className={styles.badge} style={{ background: '#10b981' }}>SSR</div>
      <h1 className={styles.title}>🖥️ Server Side Rendering</h1>

      <div className={styles.infoBox}>
        <h3>동작 방식</h3>
        <ol>
          <li>브라우저가 페이지 요청</li>
          <li>서버에서 <code>getServerSideProps</code> 실행</li>
          <li>데이터를 포함한 완성된 HTML 전송</li>
          <li>클라이언트에서 Hydration (JS 이벤트 연결)</li>
        </ol>
        <p className={styles.code}>사용: <code>export async function getServerSideProps(context)</code></p>
      </div>

      <div className={styles.serverInfo}>
        <p>🕐 서버 렌더링 시각: <strong>{serverTime}</strong></p>
        <p>📡 API 호출 시각: <strong>{fetchedAt}</strong></p>
        <p style={{ fontSize: '13px', color: '#64748b' }}>
          💡 페이지를 새로고침하면 시각이 바뀝니다 (매 요청마다 서버 실행)
        </p>
      </div>

      <h2>게시글 목록 (서버에서 패칭)</h2>
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
    </div>
  )
}

/**
 * getServerSideProps: 매 요청 시 서버에서 실행
 * - context: req, res, params, query 등 포함
 * - 반드시 { props } 객체를 반환해야 함
 */
export async function getServerSideProps(context) {
  // 서버 시간 기록
  const serverTime = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })

  // 서버에서 API 호출
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
  const posts = await res.json()

  const fetchedAt = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })

  // props로 컴포넌트에 전달
  return {
    props: {
      posts,
      fetchedAt,
      serverTime,
    },
  }
}
