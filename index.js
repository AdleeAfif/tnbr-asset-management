const express = require("express");
require("dotenv").config();
const path = require("path");

const { route } = require("./routes");
const { db, createDatabaseIfNotExists } = require("./db");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use("/", route);

const startServer = async () => {
  try {
    await createDatabaseIfNotExists();

    await db.sync({});

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Unable to start the server:", error);
  }
};

startServer();
