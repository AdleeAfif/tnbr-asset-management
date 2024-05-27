const { Router } = require("express");
const { registerUser, loginUser } = require("../controllers/user.controller");
const { authenticateToken } = require("../middlewares/authentication");
const { displayAssets } = require("../controllers/asset.controller");

const router = Router();

router.route("/").get(authenticateToken, displayAssets);

router
  .route("/login")
  .get((req, res) => res.render("login"))
  .post(loginUser, (req, res) => res.redirect("/"));

router
  .route("/register")
  .get((req, res) => res.render("register"))
  .post(registerUser, (req, res) => res.redirect("/login"));

router.route("/logout").get(authenticateToken, (req, res) => {
  res.clearCookie("token");
  console.log("User logged out successfully");
  return res.redirect("/login");
});

module.exports = { router };
