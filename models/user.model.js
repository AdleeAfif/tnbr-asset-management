const Sequelize = require("sequelize");
const bcryptjs = require("bcryptjs");

const { db } = require("../db");

const userModel = (db) => {
  return db.define(
    "User",
    {
      id: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.DataTypes.UUIDV4,
      },
      username: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      hooks: {
        beforeSave: async (user) => {
          if (user.changed("password")) {
            const salt = await bcryptjs.genSalt(10);
            const hash = await bcryptjs.hash(user.password, salt);
            user.password = hash;
          }
        },
      },
    }
  );
};

const User = userModel(db);

module.exports = { User };
