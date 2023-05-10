const { matkulAlreadyExistsError, matkulDidNotExistsError } = require("../../error/matkulError");
const catchError = require("../../error/catchError");
const db = require("../../models");

const MATKUL_MODEL = db.tbl_mataKuliahs;

// Get All Matkul Data
async function getAllMatkul(req, res) {
  await MATKUL_MODEL.findAll({ order: [["id", "ASC"]] }).then((data) => {
    return res.status(200).json({ message: "Success!", data: data });
  });
}

// Get One Matkul
async function getOneMatkul(req, res) {
  const matkul = await MATKUL_MODEL.findOne({
    where: {
      id: parseInt(req.params.id),
    },
  });

  if (matkul) {
    return res.status(200).json({
      message: "Success!",
      data: matkul,
    });
  } else {
    matkulDidNotExistsError(res);
  }
}

// Add New Matkul
async function addNewMatkul(req, res) {
  try {
    const { matkul_name, matkul_code } = req.body;

    const dataReq = {
      matkul_name: matkul_name,
      matkul_code: matkul_code,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Check if matkul already exists
    const matkul = await MATKUL_MODEL.findOne({
      where: {
        matkul_name: matkul_name,
        matkul_code: matkul_code,
      },
    });
    if (matkul) return matkulAlreadyExistsError(res);

    await MATKUL_MODEL.create(dataReq).then((data) => {
      return res.status(200).json({
        message: "New Matkul Added!",
        data: data,
      });
    });
  } catch (error) {
    catchError(res, error);
  }
}

// Update Matkul
async function updateMatkul(req, res) {
  try {
    const { matkul_name, matkul_code } = req.body;
    const matkulId = parseInt(req.params.id);

    // Check if matkul exist
    const matkul = await getOneMatkulById(matkulId);
    if (!matkul) return matkulDidNotExistsError(res);

    const dataReq = {
      matkul_name: matkul_name,
      matkul_code: matkul_code,
      updatedAt: new Date(),
    };

    await MATKUL_MODEL.update(dataReq, {
      where: {
        id: matkulId,
      },
    }).then(() => {
      return res.status(200).json({
        message: "Mata kuliah updated successfully!",
        data: dataReq,
      });
    });
  } catch (error) {
    catchError(res, error);
  }
}

// Delete Matkul
async function deleteMatkul(req, res) {
  try {
    const matkulId = parseInt(req.params.id);

    const matkul = await getOneMatkulById(matkulId);
    if (!matkul) return matkulDidNotExistsError(res);

    await MATKUL_MODEL.destroy({
      where: {
        id: matkulId,
      },
    }).then(() => {
      return res.status(200).json({
        message: "Mata kuliah deleted successfully!",
      });
    });
  } catch (error) {
    catchError(res, error);
  }
}

// Get one matkul
async function getOneMatkulById(id) {
  return await MATKUL_MODEL.findOne({
    where: {
      id: id,
    },
  });
}

module.exports = {
  getAllMatkul,
  getOneMatkul,
  addNewMatkul,
  updateMatkul,
  deleteMatkul,
  getOneMatkulById,
};
