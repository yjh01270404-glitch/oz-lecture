const books = [];
const rentals = [];

function addBook() {
  const titleInput = document.getElementById("bookTitle");
  const priceInput = document.getElementById("bookPrice");
  const title = titleInput.value.trim();
  const price = Number(priceInput.value);

  if (title === "" || isNaN(price) || price <= 0) {
    alert("도서 제목과 유효한 가격(0 이상)을 입력하세요!");
    return;
  }

  const book = { title, price };
  books.push(book);

  const rental = createBookRental(title);
  rentals.push(rental);

  const bookList = document.getElementById("bookList");
  const li = document.createElement("li");
  li.className = "book-item";
  li.innerHTML = `
        <span>${title} - ${price}원 (대여 가능)</span>
        <button onclick="removeBook(this)">삭제</button>
        <button onclick="toggleRental(this)">대여/반납</button>
    `;
  bookList.appendChild(li);

  titleInput.value = "";
  priceInput.value = "";
}

function removeBook(button) {
  const li = button.parentElement;
  const text = li.querySelector("span").textContent;
  const title = text.split(" - ")[0];

  const bookIndex = books.findIndex((b) => b.title === title);
  if (bookIndex !== -1) books.splice(bookIndex, 1);

  const rentalIndex = rentals.findIndex((r) => r.getStatus().title === title);
  if (rentalIndex !== -1) rentals.splice(rentalIndex, 1);

  li.remove();
}

function processBooks() {
  const prefixedBooks = books.map((book) => ({
    title: "Book: " + book.title,
    price: book.price
  }));

  const highPriceBooks = books.filter((book) => book.price >= 10000);

  const totalPrice = books.reduce((acc, book) => acc + book.price, 0);

  const resultsDiv = document.getElementById("results");
  let html = "<h3>상위 가격 도서:</h3><ul>";
  if (prefixedBooks.length === 0) {
    html += "<li>도서가 없습니다.</li>";
  } else {
    prefixedBooks.forEach((book) => {
      html += `<li>${book.title} - ${book.price}원</li>`;
    });
  }
  html += "</ul>";

  html += "<h3>고가 도서:</h3><ul>";
  if (highPriceBooks.length === 0) {
    html += "<li>고가 도서가 없습니다.</li>";
  } else {
    highPriceBooks.forEach((book) => {
      html += `<li>${book.title} - ${book.price}원</li>`;
    });
  }
  html += "</ul>";

  html += `<h3>총 가격:</h3><p>${totalPrice}원</p>`;
  resultsDiv.innerHTML = html;
}

const createBookRental = (bookTitle) => {
  let isBorrowed = false;
  let borrowCount = 0;
  return {
    borrow: () => {
      if (isBorrowed) {
        alert(`${bookTitle}은 이미 대여 중입니다.`);
        return false;
      }
      isBorrowed = true;
      borrowCount++;
      return true;
    },
    returnBook: () => {
      isBorrowed = false;
    },
    getStatus: () => ({
      title: bookTitle,
      isBorrowed,
      borrowCount
    })
  };
};

function toggleRental(button) {
  const li = button.parentElement;
  const text = li.querySelector("span").textContent;
  const title = text.split(" - ")[0];

  const rental = rentals.find((r) => r.getStatus().title === title);
  if (!rental) return;

  const status = rental.getStatus();
  const book = books.find((b) => b.title === title);

  if (status.isBorrowed) {
    rental.returnBook();
    li.querySelector("span").textContent =
      `${title} - ${book.price}원 (대여 가능)`;
  } else {
    if (rental.borrow()) {
      li.querySelector("span").textContent =
        `${title} - ${book.price}원 (대여 중)`;
    }
  }
}

function showAllRentalStatus() {
  const resultsDiv = document.getElementById("results");
  let html = "<h3>대여 상태:</h3><ul>";
  if (rentals.length === 0) {
    html += "<li>대여 정보가 없습니다.</li>";
  } else {
    rentals.forEach((rental) => {
      const status = rental.getStatus();
      html += `<li>${status.title}: ${status.isBorrowed ? "대여 중" : "대여 가능"}, 대여 횟수: ${status.borrowCount}</li>`;
    });
  }
  html += "</ul>";
  resultsDiv.innerHTML = html;
}
