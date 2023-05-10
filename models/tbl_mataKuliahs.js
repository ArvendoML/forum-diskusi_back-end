"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class tbl_mataKuliahs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbl_mataKuliahs.init(
    {
      matkul_name: DataTypes.STRING,
      matkul_code: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "tbl_mataKuliahs",
    }
  );
  return tbl_mataKuliahs;
};
