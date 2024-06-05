const { Asset } = require("../models");

const createAsset = (body) => {
  return Asset.create({ ...body });
};

const getAssets = async () => {
  return await Asset.findAll({ order: [["createdAt", "DESC"]] });
};

const findAssetById = async (id) => {
  return await Asset.findOne({ where: { id } });
};

const deleteAsset = async (id) => {
  return await Asset.destroy({ where: { id } });
};

module.exports = { createAsset, getAssets, findAssetById, deleteAsset };
