// =============================================
// DAY12 - 영화 컬렉션 관리 프로그램
// =============================================

// -----------------------------------------------
// 1. 변수 선언 (var, let, const 각 1회 이상 사용)
// -----------------------------------------------
const defaultGenre = "Unknown"; // const: 변하지 않는 값
let movies = []; // let: 나중에 변할 수 있는 배열
var count = 0; // var: 카운트용 (과제 요구사항 충족)

// -----------------------------------------------
// 2. 영화 객체 3개 하드코딩 생성
//    { title, director, year, genre }
// -----------------------------------------------
let movie1 = {
  title: "The Matrix",
  director: "Wachowskis",
  year: 1999,
  genre: "Sci-Fi"
};
let movie2 = {
  title: "Inception",
  director: "Nolan",
  year: 2010,
  genre: "Sci-Fi"
};
let movie3 = {
  title: "Parasite",
  director: "Bong",
  year: 2019,
  genre: "Drama"
};
let movie4 = {
  title: "Interstellar",
  director: "Nolan",
  year: 2014,
  genre: "Sci-Fi"
};
let movie5 = {
  title: "Oldboy",
  director: "Park",
  year: 2003,
  genre: "Thriller"
};

// -----------------------------------------------
// 3. ...rest 파라미터로 여러 영화 한번에 추가 (도전 과제)
//    addMovies(movie1, movie2, ...) 형태로 호출
// -----------------------------------------------
function addMovies(...newMovies) {
  for (let i = 0; i < newMovies.length; i++) {
    let movie = newMovies[i];

    // 빈 속성 확인 후 기본값 설정 (조건문 사용)
    if (!movie.title) movie.title = "Unknown";
    if (!movie.director) movie.director = "Unknown";
    if (!movie.year) movie.year = 0;
    if (!movie.genre) movie.genre = defaultGenre; // const 활용

    movies.push(movie);
    count++; // var count 증가
  }
}

// 영화 배열에 추가
addMovies(movie1, movie2, movie3, movie4, movie5);

// -----------------------------------------------
// 4. 함수 선언문: 영화 목록 전체 출력
//    매개변수 기본값 포함
// -----------------------------------------------
function printMovies(movieList, title = "Movie Collection") {
  console.log("\n" + title + ":");

  for (let i = 0; i < movieList.length; i++) {
    let m = movieList[i];
    console.log(
      `${i + 1}. Title: ${m.title}, Director: ${m.director}, Year: ${m.year}, Genre: ${m.genre}`
    );
  }

  console.log(`Total Movies: ${movieList.length}`);
}

// -----------------------------------------------
// [도전] 5. 장르 검색 함수 (함수 선언문)
// -----------------------------------------------
function searchByGenre(genre) {
  let result = [];

  for (let i = 0; i < movies.length; i++) {
    if (movies[i].genre === genre) {
      result.push(movies[i]);
    }
  }

  if (result.length === 0) {
    console.log(`\nNo movies found for genre: ${genre}.`);
  } else {
    printMovies(result, genre + " Movies");
  }
}

// -----------------------------------------------
// [도전] 6. 평균 출판연도 계산 (함수 표현식)
// -----------------------------------------------
const calculateAverageYear = function (movieList) {
  let total = 0;
  for (let i = 0; i < movieList.length; i++) {
    total += movieList[i].year;
  }
  return Math.round(total / movieList.length);
};

// -----------------------------------------------
// [도전] 7. 가장 최신 영화 찾기 (화살표 함수)
// -----------------------------------------------
const findNewestMovie = (movieList) => {
  let newest = movieList[0];
  for (let i = 1; i < movieList.length; i++) {
    if (movieList[i].year > newest.year) {
      newest = movieList[i];
    }
  }
  return newest;
};

// -----------------------------------------------
// 8. 통계 출력 함수
// -----------------------------------------------
function printStats(movieList) {
  let avgYear = calculateAverageYear(movieList);
  let newest = findNewestMovie(movieList);

  console.log("\nStatistics:");
  console.log(`Average Year: ${avgYear}`);
  console.log(`Newest Movie: ${newest.title} (${newest.year})`);
}

// =============================================
// ▶ 실행 (여기서 함수들을 순서대로 호출)
// =============================================

// 전체 영화 목록 출력
printMovies(movies);

// 장르별 검색
searchByGenre("Sci-Fi");
searchByGenre("Drama");
searchByGenre("Horror"); // 없는 장르 → "No movies found" 출력

// 통계 출력
printStats(movies);
