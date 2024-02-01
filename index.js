const myLibrary = [];

function Book(
  title = "unknown",
  author = "unkown",
  pages = "0",
  isRead = false
) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

const submitBtn = document
  .getElementById("addBookForm")
  .addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Create a new Book object
    const newBook = getBookFromInput();

    // Add the new Book object to the library
    myLibrary.push(newBook);

    // Optionally, you can update the UI here to reflect the newly added book

    const booksGrid = document.getElementById("booksGrid");
    const newBookCard = addBookToCard(newBook);
    booksGrid.insertAdjacentHTML("beforeend", newBookCard);

    // Clear the form fields
    clearInputs();
    closeAddBookModal();
  });

function addBookToCard(book) {
  let read;
  let readColor;
  if (book.isRead) {
    read = "Read";
    readColor = `btn-light-green`;
  } else {
    read = "Not Read";
    readColor = `btn-light-red`;
  }
  return `
        <div class="book-card">
            <p>${book.title}</p>
            <p>${book.author}</p>
            <p>${book.pages} pages</p>
            <div class="button-group">
                <button id='btnColor' class="btn btnColor ${readColor}">${read}</button>
                <button class="btn btnRemove">Remove</button>
            </div>
        </div>`;
}
const addBookBtn = document.getElementById("addBookBtn");
const addBookModal = document.getElementById("addBookModal");
const errorMsg = document.getElementById("errorMsg");
const overlay = document.getElementById("overlay");
const addBookForm = document.getElementById("addBookForm");
const title = document.getElementById("title").value;
const btnRead = document.getElementById("btnRead");

const openAddBookModal = () => {
  addBookForm.reset();
  addBookModal.classList.add("active");
  overlay.classList.add("active");
};

const closeAddBookModal = () => {
  addBookModal.classList.remove("active");
  overlay.classList.remove("active");
  errorMsg.classList.remove("active");
  errorMsg.textContent = "";
};

const getBookFromInput = () => {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const isRead = document.getElementById("isRead").checked;
  return new Book(title, author, pages, isRead);
};
addBookBtn.onclick = openAddBookModal;
overlay.onclick = closeAddBookModal;

document
  .querySelector(".books-grid")
  .addEventListener("click", function (event) {
    if (event.target.classList.contains("btnColor")) {
      toggleReadStatus(event.target);
    }
  });

function toggleReadStatus(btn) {
  btn.classList.toggle("btn-light-green");
  btn.classList.toggle("btn-light-red");

  if (btn.textContent === "Read") {
    btn.textContent = "Not Read";
  } else {
    btn.textContent = "Read";
  }
}
const handleKeyboardInput = (e) => {
  if (e.key === "Escape") closeAddBookModal();
};

function clearInputs() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("pages").value = "";
  document.getElementById("isRead").checked = false;
}
document
  .querySelector(".books-grid")
  .addEventListener("click", function (event) {
    if (event.target.classList.contains("btnRemove")) {
      // Find the parent card element and remove it from the DOM
      const cardToRemove = event.target.closest(".book-card");
      cardToRemove.remove();

      // Find the index of the corresponding book object in myLibrary array
      const title = cardToRemove.querySelector("p:first-child").textContent;
      const index = myLibrary.findIndex((book) => book.title === title);

      // Remove the book object from the myLibrary array
      if (index !== -1) {
        myLibrary.splice(index, 1);
      }
    }
  });
