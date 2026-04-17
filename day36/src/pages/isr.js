import Link from 'next/link'
import styles from '@/styles/Page.module.css'

/**
 * ISR (Incremental Static Regeneration) 예제 페이지
 *
 * - SSG + 주기적 재생성의 결합
 * - getStaticProps에 revalidate 옵션을 추가하면 ISR이 됩니다.
 * - 빌드 후에도 일정 시간마다 백그라운드에서 페이지를 재생성합니다.
 * - 장점: 정적 페이지의 속도 + 주기적 데이터 갱신
 */
export default function ISRPage({ posts, generatedAt, revalidateSeconds }) {
  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backBtn}>← 홈으로</Link>

      <div className={styles.badge} style={{ background: '#8b5cf6' }}>ISR</div>
      <h1 className={styles.title}>🔄 Incremental Static Regeneration</h1>

      <div className={styles.infoBox}>
        <h3>동작 방식</h3>
        <ol>
          <li>빌드 시 정적 HTML 생성 (SSG와 동일)</li>
          <li>사용자 요청 시 캐시된 HTML 즉시 응답</li>
          <li><code>revalidate</code> 초 경과 후 첫 요청이 오면 백그라운드 재생성</li>
          <li>재생성 완료 후 다음 요청부터 새 HTML 응답</li>
        </ol>
        <p className={styles.code}>
          사용: <code>getStaticProps</code> + <code>revalidate: {revalidateSeconds}</code>
        </p>
      </div>

      <div className={styles.serverInfo}>
        <p>🏗️ HTML 생성/갱신 시각: <strong>{generatedAt}</strong></p>
        <p>⏱️ 재검증 주기: <strong>{revalidateSeconds}초</strong></p>
        <p style={{ fontSize: '13px', color: '#64748b' }}>
          💡 {revalidateSeconds}초 후 새로고침하면 백그라운드에서 재생성됩니다 (개발 환경: 항상 재실행)
        </p>
      </div>

      <h2>게시글 목록</h2>
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

export async function getStaticProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
  const posts = await res.json()

  const generatedAt = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
  const revalidateSeconds = 30

  return {
    props: {
      posts,
      generatedAt,
      revalidateSeconds,
    },
    // ISR 핵심: 30초마다 재생성
    revalidate: revalidateSeconds,
  }
}
