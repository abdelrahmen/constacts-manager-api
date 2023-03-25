const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
  const { email, password } = req.body;
  if (!password || !email) {
    res.status(400);
    throw new Error("All fields are required!");
  }
  const user = await User.findOne({ email });
  isPassCorrect = await bcrypt.compare(password, user.password);
  if (user && isPassCorrect) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user._id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "24h",
      }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw Error("email or password are not valid");
  }
});

//@description info of the current user
//@route POST /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
};
