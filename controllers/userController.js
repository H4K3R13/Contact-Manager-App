const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//@desc Register the user
//@route POST /api/users/register
//@access public

const userRegister = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are required ");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("Email is already taken ");
  }
  //Hash password
  const hashPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashPassword,
  });
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not Valid");
  }
});

//@desc Login the user
//@route POST /api/user/login
//@access public
const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const user = await User.findOne({ email });
  //Pass check
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "60m" }
    );
    res.status(200).json({ accessToken });
  }else{
    res.status(401)
    throw new Error("Something Went Wrong")
  }
  res.json({ message: "Logged In" });
});

//@desc Current user info
//@route GET /api/user/current
//@access private
const userCurrent = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { userRegister, userLogin, userCurrent };
