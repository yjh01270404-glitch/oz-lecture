"""
DAY43 : MongoDB CRUD (MongoDB 개요)
"""

from __future__ import annotations


def main() -> None:
    print("=== DAY43 : MongoDB CRUD ===")
    print("db.users.insertMany([")
    print('  {"name": "David", "age": 22, "city": "Daegu"},')
    print('  {"name": "Alice", "age": 27, "city": "Seoul"},')
    print('  {"name": "Bob", "age": 31, "city": "Busan"},')
    print('  {"name": "Carol", "age": 24, "city": "Incheon"},')
    print('  {"name": "Evan", "age": 29, "city": "Daegu"}')
    print("])")
    print("db.users.findOne({ name: 'David' })")
    print("db.users.find({ age: { $gte: 25 } })")
    print("db.users.updateOne({ name: 'David' }, { $set: { age: 23 } })")
    print("db.users.deleteMany({ city: 'Daegu' })")
    print("db.users.find()")


if __name__ == "__main__":
    main()
