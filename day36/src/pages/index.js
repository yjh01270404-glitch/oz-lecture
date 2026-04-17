import Link from 'next/link'
import styles from '@/styles/Home.module.css'

/**
 * 홈 페이지 (CSR - Client Side Rendering)
 * Next.js의 기본 페이지는 CSR로 동작합니다.
 * 데이터 패칭 없이 정적 HTML로 렌더링됩니다.
 */
export default function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>⚡ DAY36: Next.js 기초</h1>
        <p className={styles.subtitle}>
          CSR · SSR · SSG 렌더링 방식 비교 데모
        </p>
      </header>

      <nav className={styles.nav}>
        <Link href="/csr" className={styles.card}>
          <h2>🌐 CSR</h2>
          <p>Client Side Rendering</p>
          <span>클라이언트에서 데이터 패칭</span>
        </Link>

        <Link href="/ssr" className={styles.card}>
          <h2>🖥️ SSR</h2>
          <p>Server Side Rendering</p>
          <span>요청마다 서버에서 렌더링</span>
        </Link>

        <Link href="/ssg" className={styles.card}>
          <h2>📄 SSG</h2>
          <p>Static Site Generation</p>
          <span>빌드 시 정적 HTML 생성</span>
        </Link>

        <Link href="/isr" className={styles.card}>
          <h2>🔄 ISR</h2>
          <p>Incremental Static Regeneration</p>
          <span>일정 시간마다 재생성</span>
        </Link>
      </nav>

      <section className={styles.comparison}>
        <h2>렌더링 방식 비교</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>방식</th>
              <th>렌더링 시점</th>
              <th>SEO</th>
              <th>성능</th>
              <th>사용 함수</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>CSR</strong></td>
              <td>클라이언트 (브라우저)</td>
              <td>❌ 불리</td>
              <td>초기 느림</td>
              <td>useEffect</td>
            </tr>
            <tr>
              <td><strong>SSR</strong></td>
              <td>요청마다 서버</td>
              <td>✅ 유리</td>
              <td>서버 부하↑</td>
              <td>getServerSideProps</td>
            </tr>
            <tr>
              <td><strong>SSG</strong></td>
              <td>빌드 타임</td>
              <td>✅ 최고</td>
              <td>가장 빠름</td>
              <td>getStaticProps</td>
            </tr>
            <tr>
              <td><strong>ISR</strong></td>
              <td>빌드 + 주기적 갱신</td>
              <td>✅ 유리</td>
              <td>빠름</td>
              <td>revalidate</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  )
}
