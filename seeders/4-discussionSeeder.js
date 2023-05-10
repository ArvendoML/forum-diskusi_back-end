"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    let data = [
      {
        discussion_title: "Perkenalan Diri!",
        discussion_description:
          "Mari perkenalkan diri ke teman-teman yang lain terlebih dahulu yuk!",
        discussion_status: false,
        id_matkul: 1,
        id_user: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("tbl_discussions", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("tbl_discussions", null, {});
  },
};
