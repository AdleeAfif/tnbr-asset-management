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

module.exports = { registerUser };
