"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tbl_users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbl_users.init(
    {
      user_name: DataTypes.STRING,
      user_email: DataTypes.STRING,
      user_password: DataTypes.STRING,
      user_nim: DataTypes.STRING,
      user_imageUrl: DataTypes.STRING,
      user_matkul: DataTypes.ARRAY(DataTypes.INTEGER),
      id_role: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "tbl_users",
    }
  );
  return tbl_users;
};
