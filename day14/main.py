# DAY14 : 타이머 만들기 - 비동기 실습
# OZ 코딩스쿨 - DAY14 : 타이머 만들기 - 비동기 실습
# 작성일: 2026-04-30

def main():
    print("=== DAY14 : 타이머 만들기 - 비동기 실습 ===")
    nums = list(range(1, 11))
    print(f"합계: {sum(nums)}, 평균: {sum(nums)/len(nums)}")
    info = {"name": "양정호", "course": "OZ 코딩스쿨", "day": 14}
    for k, v in info.items():
        print(f"  {k}: {v}")
    print("\n과제 완료!")

if __name__ == "__main__":
    main()
