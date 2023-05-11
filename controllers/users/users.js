const catchError = require("../../error/catchError");
const { matkulDidNotExistsError } = require("../../error/matkulError");
const {
  userMatkulAlreadyAddedError,
  userMatkulDidNotExistsError,
} = require("../../error/userError");
const { getTokenId } = require("../../middlewares/jwtAuth");
const { getOneMatkulById } = require("../matkul/matkul");
const bcrypt = require("bcryptjs");
const db = require("../../models");
const cloudinaryUploadImage = require("../../utils/cloudinaryUploadImage");

const USERS_MODEL = db.tbl_users;
const salt = process.env.SALT;

// Get All User
async function getAllUsers(req, res) {
  await USERS_MODEL.findAll({
    attributes: {
      exclude: ["user_password", "user_email"],
    },
  }).then((data) => {
    return res.status(200).json({
      message: "Success!",
      data: data,
    });
  });
}

// Get One User Info
async function getUserProfile(req, res) {
  await USERS_MODEL.findOne({
    where: {
      id: getTokenId(req),
    },
    attributes: {
      exclude: ["user_password"],
    },
  }).then((data) => {
    return res.status(200).json({
      message: "Success!",
      data: data,
    });
  });
}

// Get User By Id
async function getUserProfileById(req, res) {
  await USERS_MODEL.findOne({
    where: {
      id: parseInt(req.params.id),
    },
    attributes: {
      exclude: ["user_email", "user_password", "user_matkul"],
    },
  }).then((data) => {
    return res.status(200).json({
      message: "Success!",
      data: data,
    });
  });
}

// Change user password
async function updateUserPassword(req, res) {
  try {
    const { user_newPassword } = req.body;
    const userId = getTokenId(req);

    let hashNewPassword = bcrypt.hashSync(user_newPassword + salt, 12);

    const dataReq = {
      user_password: hashNewPassword,
      updatedAt: new Date(),
    };

    await USERS_MODEL.update(dataReq, {
      where: {
        id: userId,
      },
    }).then(() => {
      res.status(200).json({
        message: "Password Updated Succesfully!",
      });
    });
  } catch (error) {
    catchError(res, error);
  }
}

// Update User Profile
async function updateUserProfile(req, res) {
  try {
    const { user_name, user_nim } = req.body;
    const imageUrl = await cloudinaryUploadImage(req, "forum-diskusi/user-images");
    const userId = getTokenId(req);

    const dataReq = {
      user_name: user_name,
      user_nim: user_nim,
      user_imageUrl: imageUrl,
      updatedAt: new Date(),
    };

    await USERS_MODEL.update(dataReq, {
      where: {
        id: userId,
      },
    }).then(() => {
      return res.status(200).json({
        message: "Profile updated successfully!",
        data: dataReq,
      });
    });
  } catch (error) {
    catchError(res, error);
  }
}

// Update user matkul
async function updateUserMatkul(req, res) {
  try {
    const user = await findUserByTokenId(req);

    // Check if matkul exist
    const matkulId = parseInt(req.params.id);
    const matkul = await getOneMatkulById(matkulId);
    if (!matkul) return matkulDidNotExistsError(res);

    const userMatkul = user.user_matkul || [];
    const findMatkul = userMatkul.filter((data) => data === matkulId);

    if (findMatkul == 0) {
      const dataReq = {
        user_matkul: [...userMatkul, matkulId],
        updatedAt: new Date(),
      };

      await USERS_MODEL.update(dataReq, { where: { id: user.id } }).then(() => {
        return res.status(200).json({
          message: "Adding New Mata Kuliah Success!",
          user_matkul: dataReq,
        });
      });
    } else {
      return userMatkulAlreadyAddedError(res);
    }
  } catch (error) {
    catchError(res, error);
  }
}

// Update Delete Matkul
async function deleteUserMatkul(req, res) {
  try {
    const user = await findUserByTokenId(req);

    // Check if matkul exist
    const matkulId = parseInt(req.params.id);
    const matkul = await getOneMatkulById(matkulId);
    if (!matkul) return matkulDidNotExistsError(res);

    const userMatkul = user.user_matkul || [];
    const findMatkul = userMatkul.filter((data) => data === matkulId);

    if (findMatkul == 0) {
      return userMatkulDidNotExistsError(res);
    } else {
      const dataReq = {
        user_matkul: user.user_matkul.filter((data) => data !== matkulId),
        updatedAt: new Date(),
      };

      await USERS_MODEL.update(dataReq, {
        where: {
          id: user.id,
        },
      }).then(() => {
        return res.status(200).json({
          message: "Delete Mata Kuliah Success!",
          user_matkul: dataReq,
        });
      });
    }
  } catch (error) {
    catchError(res, error);
  }
}

// Find User By Id in Token
const findUserByTokenId = async (req) => {
  return await USERS_MODEL.findOne({
    where: {
      id: getTokenId(req),
    },
  });
};

module.exports = {
  getAllUsers,
  getUserProfile,
  getUserProfileById,
  updateUserProfile,
  updateUserPassword,
  updateUserMatkul,
  deleteUserMatkul,
};
