// first importing express
const express = require("express");
const { users } = require("./data/users.json");
const app = express();

const port = 3000;

app.use(express.json()); // we are uing the application only in json format

app.get("/", (req, res) => {
  res.status(200).json({
    message: "server is up and running :-)",
    data: "hey",
  });
});
/*
Route: /users
Method: GET
Description: Get all users
Access: Public
Parameter: none
*/

app.get("/users", (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
});

/*
Route: /users/:id 
Method: GET
Description: Get single user by their id 
Access: Public
Parameter: id 
*/
app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "user does not exist",
    });
  }
  return res.status(200).json({
    success: true,
    message: "user found",
    data: user,
  });
});
/*
Route: /users
Method: POST
Description: Creating a  new user
Access: Public
Parameter: none
*/
app.post("/users", (req, res) => {
  const { id, name, surname, email, subscriptionType, subscriptionDate } =
    req.body;

  const user = users.find((each) => each.id === id);

  if (user) {
    return res.status(404).json({
      success: false,
      message: " user with the id already exists",
    });
  }

  users.push({
    id,
    name,
    surname,
    email,
    subscriptionType,
    subscriptionDate,
  });

  return res.status(201).json({
    Success: true,
    message: "user added successfuly",
    data: users,
  });
});

/*
Route: /users/:id
Method: PUT
Description: Updating a user by their id 
Access: Public
Parameter: ID
*/
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User Doesn't Exist !!",
    });
  }
  const updateUserData = users.map((each) => {
    if (each.id === id) {
      return {
        ...each,
        ...data,
      };
    }
    return each;
  });
  return res.status(200).json({
    success: true,
    message: "User Updated !!",
    data: updateUserData,
  });
});

/*
Route: /users/:id
Method: DELETE
Description: DELETING a user by their id 
Access: Public
Parameter: ID
*/

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User Doesn't Exist !!",
    });
  }
});

app.get("*", (req, res) => {
  res.status(404).json({
    message: "This route does not exists",
  });
});
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
