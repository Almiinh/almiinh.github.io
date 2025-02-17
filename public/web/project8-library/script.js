// Array to store all books
const myLibrary = [];

// Book constructor
function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.toggleRead = function () {
        this.isRead = !this.isRead;
    };
}

// Function to add a new book to the library
function addBookToLibrary(title, author, pages, isRead) {
    const newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);
    displayBooks(); // Refresh the display when a new book is added
}

// Function to display all books
function displayBooks() {
    const libraryContainer = document.getElementById("library-container");
    libraryContainer.innerHTML = ""; // Clear existing display

    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        bookCard.setAttribute("data-index", index);

        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Status: ${book.isRead ? "Read" : "Not Read"}</p>
            <button onclick="removeBook(${index})" class="remove-btn">Remove</button>
            <button onclick="toggleReadStatus(${index})" class="toggle-btn">
                Toggle Read Status
            </button>
        `;

        libraryContainer.appendChild(bookCard);
    });
}

// Function to remove a book
function removeBook(index) {
    myLibrary.splice(index, 1);
    displayBooks();
}

// Function to toggle read status
function toggleReadStatus(index) {
    myLibrary[index].toggleRead();
    displayBooks();
}

// Function to handle new book form submission
function handleNewBookSubmit(event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const isRead = document.getElementById("isRead").checked;

    addBookToLibrary(title, author, pages, isRead);

    // Reset form
    event.target.reset();
    document.getElementById("new-book-dialog").close();
}

// Function to show the new book dialog
function showNewBookDialog() {
    document.getElementById("new-book-dialog").showModal();
}

// Add some sample books when the page loads
document.addEventListener("DOMContentLoaded", () => {
    addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
    addBookToLibrary("1984", "George Orwell", 328, false);
    displayBooks();
});
