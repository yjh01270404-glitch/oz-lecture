"""
DAY44 : ERD 설계 (데이터베이스 설계 및 트랜잭션)
"""

from __future__ import annotations


def main() -> None:
    print("=== DAY44 : ERD 설계 ===")
    print("[도서관 시스템 ERD]")
    print("- Book(book_id PK, title, author, isbn, published_year)")
    print("- User(user_id PK, name, email, phone, joined_date)")
    print("- Loan(loan_id PK, book_id FK, user_id FK, loan_date, return_date)")
    print("- 관계: Book:Loan = 1:N, User:Loan = 1:N")
    print("- 1:1 관계: 예) User - UserProfile")
    print("- 1:N 관계: 예) User - Loan, Book - Loan")
    print()
    print("[팀 프로젝트 ERD]")
    print("- Shop(shop_id PK, name, address, category)")
    print("- Review(review_id PK, shop_id FK, user_id FK, rating, content, created_at)")
    print("- User(user_id PK, nickname, email)")
    print("- 관계: User 1:N Review, Shop 1:N Review")


if __name__ == "__main__":
    main()
