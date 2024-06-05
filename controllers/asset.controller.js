const expressAsyncHandler = require("express-async-handler");

const {
  getAssets,
  createAsset,
  findAssetById,
  deleteAsset,
} = require("../helpers/asset.helper");

const displayAssets = expressAsyncHandler(async (req, res) => {
  const assets = await getAssets();
  console.log("Total number of assets: " + assets.length);
  res.render("homepage", { assets });
});

const addAsset = expressAsyncHandler(async (req, res) => {
  const {
    name,
    type,
    serialNumber,
    brandModel,
    quantity,
    purchaseDate,
    status,
    deliveryDate,
  } = req.body;

  if (
    !(
      name &&
      type &&
      serialNumber &&
      brandModel &&
      quantity &&
      purchaseDate &&
      status &&
      deliveryDate
    )
  ) {
    console.log("Required fields is/are missing");
    return res.redirect("/add-asset");
  }

  const created = await createAsset({
    name,
    type,
    serialNumber,
    brandModel,
    quantity,
    purchaseDate,
    status,
    deliveryDate,
  });

  console.log(`Asset ${created.dataValues.name} has been created successfully`);

  req.flash(
    "success",
    `Asset ${created.dataValues.name} has been created successfully`
  );

  res.redirect("/");
});

const displayAsset = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;
  const found = await findAssetById(id);

  if (!found) {
    console.log("Asset not found");
    return res.redirect("/");
  }

  res.render("editAsset", { found });
});

const removeAsset = expressAsyncHandler(async (req, res) => {
  const id = req.params.id;

  const found = await findAssetById(id);

  if (!found) {
    console.log("Asset not found");
    return res.redirect("/");
  }

  const response = await deleteAsset(id);

  if (!response) {
    console.log("Failed to delete asset");
    return res.redirect("/");
  }

  console.log(`Asset ${found.dataValues.name} has been deleted successfully`);

  res.redirect("/");
});

module.exports = { displayAssets, addAsset, removeAsset };
