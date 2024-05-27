const { Sequelize } = require("sequelize");
const { userModel } = require("./user.model");
const { assetModel } = require("./asset.model");

const db = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

const User = userModel(db);
const Asset = assetModel(db);

module.exports = { db, User, Asset };
