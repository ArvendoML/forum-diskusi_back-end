"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tbl_users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      user_email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      user_password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      user_nim: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      user_imageUrl: {
        type: Sequelize.STRING,
      },
      user_matkul: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
      },
      id_role: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "tbl_roles",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("tbl_users");
  },
};
