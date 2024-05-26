const { User } = require("../models/user.model");

const createNewUser = (body) => {
  return User.create({ ...body });
};

const findUserByUsername = async (username) => {
  return await User.findOne({ where: { username } });
};

module.exports = { createNewUser, findUserByUsername };
