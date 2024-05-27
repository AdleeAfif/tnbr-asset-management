const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    console.log("Bad Request: Login is Required");
    return res.redirect("/login");
  }

  jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
    if (err)
      return res
        .status(403)
        .json({ message: "Forbidden Request: Invalid token" });
    req.user = user;

    next();
  });
};

module.exports = { authenticateToken };
