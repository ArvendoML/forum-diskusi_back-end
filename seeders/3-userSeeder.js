"use strict";

require("dotenv").config();
const bcrypt = require("bcryptjs");

const salt = process.env.SALT;
const hashPassword = (user_password) => {
  return bcrypt.hashSync(user_password + salt, 12);
};

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      {
        user_name: "Admin",
        user_nim: "00000000001",
        user_email: "admin@gmail.com",
        user_password: hashPassword("admin123"),
        id_role: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("tbl_users", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("tbl_users", null, {});
  },
};
