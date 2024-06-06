const expressAsyncHandler = require("express-async-handler");

const {
  getAssets,
  createAsset,
  findAssetById,
  deleteAsset,
  updateAsset,
} = require("../helpers/asset.helper");

const displayAssets = expressAsyncHandler(async (req, res) => {
  const assets = await getAssets();
  const successMessage = req.flash("success");
  const errorMessage = req.flash("error");
  res.render("homepage", { assets, successMessage, errorMessage });
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

    const errorMessage = "Required fields is/are missing";

    return res.status(400).render("addAsset", { errorMessage });
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

const editAsset = expressAsyncHandler(async (req, res) => {
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

  const updateData = {
    name,
    type,
    serialNumber,
    brandModel,
    quantity,
    purchaseDate,
    status,
    deliveryDate,
    updatedAt: new Date(),
  };

  const id = req.params.id;

  const updated = await updateAsset(id, updateData);

  if (!updated) {
    console.log("Failed to update asset");
    return res.redirect("/");
  }

  console.log("Number updated asset: " + updated);

  res.json(updated.dataValues);
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

  req.flash(
    "success",
    `Asset ${found.dataValues.name} has been deleted successfully`
  );

  res.redirect("/");
});

module.exports = { displayAssets, addAsset, removeAsset, editAsset };
