const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
//@description Register the user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !password || !email) {
    res.status(400);
    throw new Error("All fields are required!");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("this user is already registered");
  }

  const hashedPass = bcrypt.hashSync(password, 10);
  const newUser = await User.create({ username, email, password: hashedPass });
  if (newUser) {
    res.status(201).json({ _id: newUser._id, email: User.email });
  } else {
    res.status(400);
    throw new Error("user data is not valid");
  }
});

//@description login the user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: "Login the user" });
});

//@description info of the current user
//@route POST /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.json({ message: "current user info " });
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
};
