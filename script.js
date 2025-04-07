// Sample books in the library
let books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925, isAvailable: true },
    { id: 2, title: "1984", author: "George Orwell", year: 1949, isAvailable: true },
    { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960, isAvailable: true }
];

// Function to render books on the page
function displayBooks() {
    const libraryDiv = document.getElementById("library");
    libraryDiv.innerHTML = ""; // Clear existing content

    books.forEach(book => {
        let bookDiv = document.createElement("div");
        bookDiv.classList.add("book");

        bookDiv.innerHTML = `
            <h2>${book.title}</h2>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Year:</strong> ${book.year}</p>
            <p><strong>Status:</strong> ${book.isAvailable ? "Available" : "Borrowed"}</p>
            <button class="borrow" ${!book.isAvailable ? "disabled" : ""} onclick="borrowBook(${book.id})">Borrow</button>
            <button class="return" ${book.isAvailable ? "disabled" : ""} onclick="returnBook(${book.id})">Return</button>
        `;

        libraryDiv.appendChild(bookDiv);
    });
}

// Function to borrow a book
function borrowBook(bookId) {
    let book = books.find(b => b.id === bookId);
    if (book && book.isAvailable) {
        book.isAvailable = false;
        alert(`You have borrowed "${book.title}".`);
        displayBooks();
    }
}

// Function to return a book
function returnBook(bookId) {
    let book = books.find(b => b.id === bookId);
    if (book && !book.isAvailable) {
        book.isAvailable = true;
        alert(`You have returned "${book.title}".`);
        displayBooks();
    }
}

// Add a new book
function addBook(event) {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const year = parseInt(document.getElementById("year").value.trim());

    if (title && author && year) {
        const newBook = {
            id: books.length + 1,
            title,
            author,
            year,
            isAvailable: true
        };
        books.push(newBook);
        displayBooks();
        document.getElementById("addBookForm").reset();
    }
}

// Search books by title or author
function searchBooks() {
    const query = document.getElementById("searchBar").value.toLowerCase();
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query)
    );

    displayFilteredBooks(filteredBooks);
}

// Render filtered book results
function displayFilteredBooks(filtered) {
    const libraryDiv = document.getElementById("library");
    libraryDiv.innerHTML = "";

    filtered.forEach(book => {
        let bookDiv = document.createElement("div");
        bookDiv.classList.add("book");

        bookDiv.innerHTML = `
            <h2>${book.title}</h2>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Year:</strong> ${book.year}</p>
            <p><strong>Status:</strong> ${book.isAvailable ? "Available" : "Borrowed"}</p>
            <button class="borrow" ${!book.isAvailable ? "disabled" : ""} onclick="borrowBook(${book.id})">Borrow</button>
            <button class="return" ${book.isAvailable ? "disabled" : ""} onclick="returnBook(${book.id})">Return</button>
        `;

        libraryDiv.appendChild(bookDiv);
    });
}

// Initial display of books
displayBooks();
