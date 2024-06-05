const { Router } = require("express");
const {
  registerUser,
  loginUser,
  logOutUser,
} = require("../controllers/user.controller");
const { authenticateToken } = require("../middlewares/authentication");
const {
  displayAssets,
  addAsset,
  removeAsset,
} = require("../controllers/asset.controller");

const router = Router();

router.route("/").get(authenticateToken, displayAssets);

router
  .route("/add")
  .get(authenticateToken, (req, res) => res.render("addAsset"))
  .post(authenticateToken, addAsset);

router.post("/:id/delete", authenticateToken, removeAsset);

router
  .route("/login")
  .get((req, res) => res.render("login"))
  .post(loginUser, (req, res) => res.redirect("/"));

router.post("/logout", authenticateToken, logOutUser);

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
