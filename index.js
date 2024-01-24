// first importing express
const express = require("express");
const {users}= require("./data/users.json");
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

app.get("/users",(req,res)=>{
  res.status(200).json({
    success:true,
    data: users,
  });
});

app.get("*",(req,res)=>{
  res.status(404).json({
    message:"This route does not exists"
  });
})
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
