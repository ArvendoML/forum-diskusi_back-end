"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn("tbl_comments", "reply_from_user", {
        type: Sequelize.TEXT,
        allowNull: true,
      }),
      queryInterface.addColumn("tbl_comments", "reply_from_comment_desc", {
        type: Sequelize.TEXT,
        allowNull: true,
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn("tbl_comments", "reply_from_user"),
      queryInterface.removeColumn("tbl_comments", "reply_from_comment_desc"),
    ]);
  },
};
