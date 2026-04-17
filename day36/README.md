# DAY36: Next.js 기초

Next.js pages 라우팅 기반 CSR / SSR / SSG / ISR 렌더링 방식 비교 데모

## 페이지 구성

| 경로 | 방식 | 설명 |
|------|------|------|
| `/` | - | 홈 (렌더링 방식 비교표) |
| `/csr` | CSR | `useEffect` + `fetch` |
| `/ssr` | SSR | `getServerSideProps` |
| `/ssg` | SSG | `getStaticProps` |
| `/isr` | ISR | `getStaticProps` + `revalidate` |

## 실행

```bash
npm install
npm run dev
# → http://localhost:3000
```
