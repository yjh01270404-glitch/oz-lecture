"""
DAY45 : 로거만들기 (Node.js 개요/환경 설정 과제의 Python 대체 구현)

요구사항 반영:
- logMessage(message) 함수 구현
- os.path.join으로 경로 지정
- log 폴더에 오늘 날짜 파일 생성 (예: ./log/2026-04-30.log)
- append 모드로 파일에 메시지 이어붙이기
"""

from __future__ import annotations

import os
from datetime import datetime


def logMessage(message: str) -> str:
    today = datetime.now().strftime("%Y-%m-%d")
    log_dir = os.path.join(".", "log")
    os.makedirs(log_dir, exist_ok=True)

    log_path = os.path.join(log_dir, f"{today}.log")
    line = f"[{datetime.now().isoformat()}] {message}\n"

    with open(log_path, "a", encoding="utf-8") as fp:
        fp.write(line)

    return log_path


def main() -> None:
    path = logMessage("DAY45 로거 과제 실행")
    print(f"로그 저장 완료: {path}")


if __name__ == "__main__":
    main()
