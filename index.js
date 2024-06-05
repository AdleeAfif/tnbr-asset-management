const express = require("express");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const path = require("path");

const { router } = require("./routes");
const { createDatabaseIfNotExists } = require("./db");
const { db } = require("./models");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use("/", router);

const startServer = async () => {
  try {
    await createDatabaseIfNotExists();

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });

    await db.sync({});
  } catch (error) {
    console.error("Unable to start the server:", error);
  }
};

startServer();
