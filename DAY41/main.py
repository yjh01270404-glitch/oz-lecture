"""
DAY41 : SQL 조회 (MySQL 기본 개념과 데이터 조회)
"""

from __future__ import annotations


def main() -> None:
    print("=== DAY41 : SQL 조회 ===")
    print("쿼리1: SELECT EmployeeID, FirstName, LastName FROM employees;")
    print("쿼리2: SELECT FirstName, LastName, Salary FROM employees WHERE Department = 'Development';")
    print("쿼리3: SELECT * FROM employees WHERE Salary >= 6000 ORDER BY Salary DESC;")
    print("쿼리4: SELECT EmployeeID, FirstName, HireDate FROM employees WHERE HireDate >= '2023-01-01';")


if __name__ == "__main__":
    main()
