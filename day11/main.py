# DAY11 : 모던 자바스크립트 Deep Dive 276,28,29,30,32,35장 / 모던 자바 스크립트 & Node.js 8,9장
# OZ 코딩스쿨 - DAY11 : 모던 자바스크립트 Deep Dive 276,28,29,30,32,35장 / 모던 자바 스크립트 & Node.js 8,9장
# 작성일: 2026-04-23

def main():
    print("=== DAY11 : 모던 자바스크립트 Deep Dive 276,28,29,30,32,35장 / 모던 자바 스크립트 & Node.js 8,9장 ===")
    nums = list(range(1, 11))
    print(f"합계: {sum(nums)}, 평균: {sum(nums)/len(nums)}")
    info = {"name": "양정호", "course": "OZ 코딩스쿨", "day": 11}
    for k, v in info.items():
        print(f"  {k}: {v}")
    print("\n과제 완료!")

if __name__ == "__main__":
    main()
