const { Asset } = require("../models");

const createAsset = (body) => {
  return Asset.create({ ...body });
};

const getAssets = async () => {
  return await Asset.findAll({ order: [["createdAt", "DESC"]] });
};

module.exports = { createAsset, getAssets };
