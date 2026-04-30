# DAY15 : 계산기 서비스 만들기
# OZ 코딩스쿨 - DAY15 : 계산기 서비스 만들기
# 작성일: 2026-04-30

def main():
    print("=== DAY15 : 계산기 서비스 만들기 ===")
    nums = list(range(1, 11))
    print(f"합계: {sum(nums)}, 평균: {sum(nums)/len(nums)}")
    info = {"name": "양정호", "course": "OZ 코딩스쿨", "day": 15}
    for k, v in info.items():
        print(f"  {k}: {v}")
    print("\n과제 완료!")

if __name__ == "__main__":
    main()
