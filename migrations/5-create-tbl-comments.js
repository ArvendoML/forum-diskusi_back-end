"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tbl_comments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_discussion: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "tbl_discussions",
          key: "id",
        },
      },
      id_user: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "tbl_users",
          key: "id",
        },
      },
      comment_description: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      comment_user_like: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
      },
      comment_user_dislike: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
      },
      reply_from_user: {
        type: Sequelize.TEXT,
      },
      reply_from_comment_desc: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable("tbl_comments");
  },
};
