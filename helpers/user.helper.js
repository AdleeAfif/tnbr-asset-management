const { User } = require("../models");

const createUser = (body) => {
  return User.create({ ...body });
};

const findUserByUsername = async (username) => {
  return await User.findOne({ where: { username } });
};

module.exports = { createUser, findUserByUsername };
