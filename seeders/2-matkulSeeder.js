"use strict";

const matkulList = [
  {
    matkul_name: "General",
    matkul_code: "AA000",
  },
  {
    matkul_name: "Bahasa Indonesia",
    matkul_code: "MSC2106",
  },
  {
    matkul_name: "Pancasila",
    matkul_code: "UM162",
  },
  {
    matkul_name: "Religion",
    matkul_code: "UM152",
  },
  {
    matkul_name: "Civics",
    matkul_code: "UM163",
  },
  {
    matkul_name: "English 1",
    matkul_code: "IM122",
  },
  {
    matkul_name: "English 2",
    matkul_code: "IM123",
  },
  {
    matkul_name: "Introduction to Multimedia Technology",
    matkul_code: "HO159",
  },
  {
    matkul_name: "Machine Learning",
    matkul_code: "IF540",
  },
  {
    matkul_name: "Discrete Mathematics",
    matkul_code: "IF120",
  },
  {
    matkul_name: "Business Communication",
    matkul_code: "HO551",
  },
  {
    matkul_name: "Intercultural Communication",
    matkul_code: "MSC3004",
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    let data = [];

    matkulList.forEach((matkul) => {
      data.push({
        matkul_name: matkul.matkul_name,
        matkul_code: matkul.matkul_code,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });

    await queryInterface.bulkInsert("tbl_mataKuliahs", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("tbl_mataKuliahs", null, {});
  },
};
