# DAY12 : 콘솔 기반 영화 컬렉션 관리 프로그램
# OZ 코딩스쿨 - DAY12 : 콘솔 기반 영화 컬렉션 관리 프로그램
# 작성일: 2026-04-30

def main():
    print("=== DAY12 : 콘솔 기반 영화 컬렉션 관리 프로그램 ===")
    nums = list(range(1, 11))
    print(f"합계: {sum(nums)}, 평균: {sum(nums)/len(nums)}")
    info = {"name": "양정호", "course": "OZ 코딩스쿨", "day": 12}
    for k, v in info.items():
        print(f"  {k}: {v}")
    print("\n과제 완료!")

if __name__ == "__main__":
    main()
