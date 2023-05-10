"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    let data = [
      {
        role_name: "Admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },{
        role_name: "Member",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("tbl_roles", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("tbl_roles", null, {});
  },
};
