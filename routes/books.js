const express = require("express");
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");
const router = express.Router();
const { Router } = require("express");

/*
Route: /
Method: GET
Description: Get all books
Access: Public
Parameter: none
*/

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "got all the books",
    data: books,
  });
});

/*
Route: /:id 
Method: GET
Description: get book by their id 
Access: Public
Parameter: id 
*/

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const book = books.find((each) => each.id === id);
  if (!book) {
    return res.status(404).json({
      success: false,
      message: "book not found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "book found",
    data: book,
  });
});

/*
Route: /books/issued
Method: GET issued books
Description: get book by their id 
Access: Public
Parameter: id 
*/

router.get("/issued/by-user", (req, res) => {
  const userWithTheIssuedBook = users.filter((each) => {
    // we are writing filter here because we want to get the user array who has issued the book
    if (each.issuedBook) return each;
  });
  const issuedBooks = [];
  userWithTheIssuedBook.forEach((each) => {
    const book = books.find((book) => book.id === each.issuedBook);
    book.issuedBy = each.name;
    book.issuedDate = each.issuedDate;
    book.returnDate = each.returnDate; // add return date

    issuedBooks.push(book);
  });

  if (issuedBooks.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No books are issued",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Users with the issued books ...",
    data: issuedBooks,
  });
});

/*
Route: /
Method: POST 
Description: Adding a new book
Access: Public
Parameter: None
Data : id, name, author, price, genre,publisher
*/

router.post("/", (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({
      success: false,
      message: "No data to add a book",
    });
  }

  const book = books.find((each) => each.id === data.id);
  if (book) {
    return res.status(404).json({
      success: false,
      message: "book with the id already exists",
    });
  }
  const allBooks = { ...books, data };
  return res.status(201).json({
    success: true,
    message: "book added",
    data: allBooks,
  });
});

/*
Route: /
Method: put
Description: updating a book by id
Access: Public
Parameter: None
Data : id, name, author, price, genre,publisher
*/
router.put("/updateBook/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({
      success: false,
      message: "No data to update a book",
    });
  }

  const book = books.find((each) => each.id === id);
  if (!book) {
    return res.status(404).json({
      success: false,
      message: "book not found",
    });
  }

  const updatedBooks = books.map((each) => {
    if (each.id === id) {
      return { ...each, ...data };
    }
    return each;
  });

  return res.status(200).json({
    success: true,
    message: "book updated",
    data: updatedBooks,
  });
});

module.exports = router;
