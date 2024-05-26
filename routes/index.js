const { Router } = require("express");
const { registerUser } = require("../controllers/user.controller");

const route = Router();

route.get("/", (req, res) => {
  res.json("Hello");
});

route.get("/login", (req, res) => {
  res.render("login");
});

route.post("/register", registerUser);

module.exports = { route };
