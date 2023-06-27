"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tbl_notifications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.tbl_users, {
        foreignKey: "id_user",
        onDelete: "CASCADE",
        hooks: true,
      });
      this.belongsTo(models.tbl_mataKuliahs, {
        foreignKey: "id_matkul",
        onDelete: "CASCADE",
        hooks: true,
      });
      this.belongsTo(models.tbl_discussions, {
        foreignKey: "id_discussion",
        onDelete: "CASCADE",
        hooks: true,
      });
    }
  }
  tbl_notifications.init(
    {
      notif_description: DataTypes.TEXT,
      id_user: DataTypes.INTEGER,
      id_matkul: DataTypes.INTEGER,
      id_discussion: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "tbl_notifications",
    }
  );
  return tbl_notifications;
};
