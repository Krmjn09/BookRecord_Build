// first importing express
const express = require("express");

const userRouter = require("./routes/users.js");
const booksRouter = require("./routes/books");
const router = express();

const port = 3000;

router.use(express.json()); // we are uing the routerlication only in json format

//localhost:3000/users
http: router.get("/", (req, res) => {
  res.status(200).json({
    message: "server is up and running :-)",
    data: "hey",
  });
});

router.use("/users", userRouter);
router.use("/books", booksRouter);

router.get("*", (req, res) => {
  res.status(404).json({
    message: "This route does not exists",
  });
});
router.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
