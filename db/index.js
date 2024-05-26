const { Sequelize } = require("sequelize");
const dotenv = require("dotenv").config();
const mysql = require("mysql2/promise");

const db = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

const createDatabaseIfNotExists = async () => {
  const { DB_HOST, DB_USER, DB_PASSWD, DB_PORT, DB_NAME } = process.env;

  const connection = await mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWD,
    port: DB_PORT,
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);

  await connection.end();
};

module.exports = { db, createDatabaseIfNotExists };
