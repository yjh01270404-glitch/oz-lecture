"""
DAY39 : Next.js + TypeScript + SEO 기초
"""

from __future__ import annotations


def main() -> None:
    print("=== DAY39 : Next.js + TypeScript + SEO 기초 ===")
    print("1) 프로젝트 구조 설명")
    print("- app/page.tsx: 'Next.js + TypeScript 연습' 출력")
    print("- app/about/page.tsx: '이 사이트는 Next.js와 TS를 사용합니다.' 출력")
    print("- app/layout.tsx: SEO metadata 설정")
    print()
    print("2) metadata 예시")
    print('metadata = { title: "My Next.js App", description: "Next.js와 TypeScript, SEO 기초 실습" }')
    print()
    print("3) SEO 핵심")
    print("- SSR/SSG는 SEO에 유리")
    print("- CSR은 초기 HTML에 콘텐츠가 적어 SEO 최적화가 상대적으로 어려움")
    print("- robots.txt, sitemap.xml은 검색엔진 크롤링/색인 최적화에 중요")


if __name__ == "__main__":
    main()
