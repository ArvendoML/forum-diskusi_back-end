"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tbl_discussionImages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.tbl_discussions, {
        foreignKey: "id_discussion",
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
  tbl_discussionImages.init(
    {
      discussionImageUrl: DataTypes.STRING,
      id_discussion: DataTypes.INTEGER,
      id_user: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "tbl_discussionImages",
    }
  );
  return tbl_discussionImages;
};
