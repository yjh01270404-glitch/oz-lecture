"""
DAY40 : ERD 작성
"""

from __future__ import annotations


def main() -> None:
    print("=== DAY40 : ERD 작성 ===")
    print("[도서관 시스템 ERD]")
    print("- Book: book_id(PK), title, author, isbn, published_year")
    print("- User: user_id(PK), name, email, phone, joined_date")
    print("- Loan: loan_id(PK), book_id(FK), user_id(FK), loan_date, return_date")
    print("- 관계: Book:Loan = 1:N, User:Loan = 1:N")
    print()
    print("[팀 프로젝트 ERD]")
    print("- Shop, Review, User 엔티티")
    print("- 관계: User 1:N Review, Shop 1:N Review")


if __name__ == "__main__":
    main()
