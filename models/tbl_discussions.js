"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class tbl_discussions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.tbl_mataKuliahs, {
        foreignKey: "id_matkul",
        onDelete: "CASCADE",
        hooks: true,
      });
      this.belongsTo(models.tbl_users, {
        foreignKey: "id_user",
        onDelete: "CASCADE",
        hooks: true,
      });
    }
  }
  tbl_discussions.init(
    {
      discussion_title: DataTypes.TEXT,
      discussion_description: DataTypes.TEXT,
      discussion_status: DataTypes.BOOLEAN,
      id_matkul: DataTypes.INTEGER,
      id_user: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "tbl_discussions",
    }
  );
  return tbl_discussions;
};
