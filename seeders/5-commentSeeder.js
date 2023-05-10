"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    let data = [
      {
        comment_description: "Perkenalkan diri yuk!",
        id_discussion: 1,
        id_user: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("tbl_comments", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("tbl_comments", null, {});
  },
};
