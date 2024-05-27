const expressAsyncHandler = require("express-async-handler");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const { findUserByUsername, createUser } = require("../helpers/user.helper");

const registerUser = expressAsyncHandler(async (req, res, next) => {
  const { username, password, cPassword } = req.body;

  if (!(username && password)) {
    console.log("Required fields is/are missing");
    return res.redirect("/register");
  }

  if (password !== cPassword) {
    console.log("Passwords are not the same!");
    return res.redirect("/register");
  }

  const user = await findUserByUsername(username);

  if (user) {
    console.log("User already exists");
    return res.redirect("/login");
  }

  const created = await createUser({ username, password });

  console.log(
    `User ${created.dataValues.username} account has been created successfully`
  );

  next();
});

const loginUser = expressAsyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  if (!(username && password)) {
    console.log("Required fields is/are missing");
    return res.redirect("/login");
  }

  const user = await findUserByUsername(username);

  if (!user) {
    console.log(`User ${username} not found`);
    res.redirect("/login");
  }

  const isMatch = await bcryptjs.compare(password, user.password);
  if (!isMatch) {
    console.log(`User entered invalid password`);
    return res.redirect("/login");
  }

  const id = user.id;
  const payload = {
    id,
    username,
  };

  const options = {
    expiresIn: "1h", // Token expiration time (optional)
  };

  const token = jwt.sign(payload, process.env.SECRET_TOKEN, options);
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 3600000,
  });

  console.log(`User ` + username + ` logged in successfully`);

  next();
});

module.exports = { registerUser, loginUser };
