const Sequelize = require("sequelize");

const assetModel = (db) => {
  return db.define("Asset", {
    id: {
      type: Sequelize.DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.DataTypes.UUIDV4,
    },
    name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [["furniture", "ict-equipment", "laboratory-equipment"]],
          msg: "Type must be one of: furniture, ict-equipment, laboratory-equipment",
        },
      },
    },
    serialNumber: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    brandModel: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    purchaseDate: {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    deliveryDate: {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
    },
  });
};

module.exports = { assetModel };
