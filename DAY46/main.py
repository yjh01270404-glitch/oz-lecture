"""
DAY46 : 비동기 작업 (Node.js 비동기 처리 개념 실습 대체)

요구사항 반영:
- asyncio + aiohttp로 https://news.ycombinator.com/ 크롤링
- URL, 수집시간, 데이터 일부 저장
- output 폴더에 txt 파일로 저장
- 파일명: crawled_날짜시간.txt
"""

from __future__ import annotations

import asyncio
from datetime import datetime
from pathlib import Path

import aiohttp


TARGET_URL = "https://news.ycombinator.com/"


async def fetch_html(session: aiohttp.ClientSession, url: str) -> str:
    async with session.get(url, timeout=20) as response:
        response.raise_for_status()
        return await response.text()


async def crawl_hn() -> Path:
    collected_at = datetime.now()
    timestamp = collected_at.strftime("%Y%m%d_%H%M%S")
    output_dir = Path("output")
    output_dir.mkdir(parents=True, exist_ok=True)
    output_file = output_dir / f"crawled_{timestamp}.txt"

    async with aiohttp.ClientSession() as session:
        html = await fetch_html(session, TARGET_URL)

    preview = html[:800].replace("\n", " ")
    payload = (
        f"URL: {TARGET_URL}\n"
        f"수집시간: {collected_at.isoformat()}\n"
        f"데이터 일부(800자):\n{preview}\n"
    )
    output_file.write_text(payload, encoding="utf-8")
    return output_file


def main() -> None:
    saved_path = asyncio.run(crawl_hn())
    print(f"저장 완료: {saved_path}")


if __name__ == "__main__":
    main()
