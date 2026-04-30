# DAY25 : React 상태관리와 Props
# OZ 코딩스쿨 - DAY25 : React 상태관리와 Props
# 작성일: 2026-04-30

def main():
    print("=== DAY25 : React 상태관리와 Props ===")
    nums = list(range(1, 11))
    print(f"합계: {sum(nums)}, 평균: {sum(nums)/len(nums)}")
    info = {"name": "양정호", "course": "OZ 코딩스쿨", "day": 25}
    for k, v in info.items():
        print(f"  {k}: {v}")
    print("\n과제 완료!")

if __name__ == "__main__":
    main()
