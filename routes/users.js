const express = require("express");
const { users } = require("../data/users.json");
const router = express.Router();
/*
Route: /
Method: GET
Description: Get all users
Access: Public
Parameter: none
*/

const { Router } = require("express");

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
});

/*
Route: /:id 
Method: GET
Description: Get single user by their id 
Access: Public
Parameter: id 
*/
router.get("/:id", (req, res) => {
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
Route: /
Method: POST
Description: Creating a  new user
Access: Public
Parameter: none
*/
router.post("/", (req, res) => {
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
Route: /:id
Method: PUT
Description: Updating a user by their id 
Access: Public
Parameter: ID
*/
router.put("/:id", (req, res) => {
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
Route: /:id
Method: DELETE
Description: DELETING a user by their id 
Access: Public
Parameter: ID
*/

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User Doesn't Exist !!",
    });
  }
  const index = users.indexOf(user);
  users.splice(index, 1);

  return res.status(200).json({
    success: true,
    message: "User Deleted !!",
    data: users,
  });
});
/*
Route: /users/subscription-details/:id
Method: DELETE
Description: Get all user subscription details
Access: Public
Parameter: ID
*/
router.get("/subscription-details/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User Doesn't Exist !!",
    });
  }
  const getDateInDays = (data = "") => {
    let date;
    if (data === "") {
      date = new Date();
    } else {
      date = new Date(data);
    }
    let days = Math.floor(data / (1000 * 60 * 60 * 24));
    return days;
  };
  const subscriptionType = (data) => {
    if ((user.subscriptionType = "Basic")) {
      date = date * 90;
    } else if ((user.subscriptionType = "Premium")) {
      date = date * 365;
    } else if ((user.subscriptionType = "Standard")) {
      date = date * 180;
    }
    return date;
  };
  let returnDate = getDateInDays(user.returnDate);
  let currentDate = getDateInDays();
  let subscriptionDate = getDateInDays(user.subscriptionDate);
  let subscriptionExpiration = subscriptionType(subscriptionDate);
  const data = {
    ...user,
    isSubscriptionExpired: subscriptionExpiration <= currentDate,
    daysLeftForExpiration:
      subscriptionExpiration <= currentDate
        ? 0
        : subscriptionExpiration - currentDate,
        
  };
});
module.exports = router;
