"""
DAY42 : SQL 쿼리 만들기 (고급 SQL 및 최적화)
"""

from __future__ import annotations


def main() -> None:
    print("=== DAY42 : SQL 쿼리 만들기 ===")
    query = """
SELECT d.dept_no, d.dept_name, COUNT(e.emp_no) AS emp_count, AVG(s.salary) AS avg_salary
FROM departments d
JOIN dept_emp de ON d.dept_no = de.dept_no
JOIN employees e ON de.emp_no = e.emp_no
JOIN salaries s ON e.emp_no = s.emp_no
WHERE de.to_date = '9999-01-01'
  AND s.to_date = '9999-01-01'
GROUP BY d.dept_no, d.dept_name;
""".strip()
    print(query)


if __name__ == "__main__":
    main()
