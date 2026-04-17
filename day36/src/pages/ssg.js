import Link from 'next/link'
import styles from '@/styles/Page.module.css'

/**
 * SSG (Static Site Generation) 예제 페이지
 *
 * - 빌드 타임( next build )에 getStaticProps가 한 번 실행됩니다.
 * - 완성된 정적 HTML 파일이 생성되어 CDN에서 서빙됩니다.
 * - 장점: 가장 빠름, SEO 최고, 서버 부하 없음
 * - 단점: 실시간 데이터 반영 불가 (ISR로 보완 가능)
 */
export default function SSGPage({ posts, generatedAt }) {
  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backBtn}>← 홈으로</Link>

      <div className={styles.badge} style={{ background: '#f59e0b' }}>SSG</div>
      <h1 className={styles.title}>📄 Static Site Generation</h1>

      <div className={styles.infoBox}>
        <h3>동작 방식</h3>
        <ol>
          <li><code>next build</code> 실행 시 <code>getStaticProps</code> 실행</li>
          <li>데이터를 포함한 정적 HTML 파일 생성</li>
          <li>CDN에 배포 후 요청마다 정적 파일 서빙</li>
          <li>서버 연산 없이 즉시 응답</li>
        </ol>
        <p className={styles.code}>사용: <code>export async function getStaticProps()</code></p>
      </div>

      <div className={styles.serverInfo}>
        <p>🏗️ HTML 생성 시각: <strong>{generatedAt}</strong></p>
        <p style={{ fontSize: '13px', color: '#64748b' }}>
          💡 새로고침해도 시각이 바뀌지 않습니다 (빌드 시 고정)
        </p>
      </div>

      <h2>게시글 목록 (빌드 시 패칭된 데이터)</h2>
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
 * getStaticProps: 빌드 타임에 한 번만 실행
 * - 반드시 { props } 또는 { notFound } 또는 { redirect } 반환
 */
export async function getStaticProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
  const posts = await res.json()

  const generatedAt = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })

  return {
    props: {
      posts,
      generatedAt,
    },
    // ISR: 60초마다 페이지 재생성 (개발 환경에서는 무시됨)
    // revalidate: 60,
  }
}
