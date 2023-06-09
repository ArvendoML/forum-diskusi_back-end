"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tbl_comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.tbl_comments, {
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
  tbl_comments.init(
    {
      comment_description: DataTypes.TEXT,
      comment_user_like: DataTypes.ARRAY(DataTypes.INTEGER),
      comment_user_dislike: DataTypes.ARRAY(DataTypes.INTEGER),
      reply_from_user: DataTypes.TEXT,
      reply_from_comment_desc: DataTypes.TEXT,
      id_discussion: DataTypes.INTEGER,
      id_user: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "tbl_comments",
    }
  );
  return tbl_comments;
};
