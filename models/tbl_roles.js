"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tbl_roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.tbl_roles, {
        foreignKey: "id_roles",
        onDelete: "CASCADE",
        hooks: true,
      });
    }
  }
  tbl_roles.init(
    {
      role_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "tbl_roles",
    }
  );
  return tbl_roles;
};
