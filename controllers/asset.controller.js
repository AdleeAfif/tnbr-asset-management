const expressAsyncHandler = require("express-async-handler");

const { getAssets } = require("../helpers/asset.helper");

const displayAssets = expressAsyncHandler(async (req, res) => {
  const assets = await getAssets();
  console.log("Total number of assets: " + assets.length);
  res.render("homepage", { assets });
});

module.exports = { displayAssets };
