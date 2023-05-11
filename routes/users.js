var express = require("express");
const {
  getAllUsers,
  updateUserMatkul,
  getUserProfile,
  deleteUserMatkul,
  getUserProfileById,
  updateUserProfile,
  updateUserPassword,
} = require("../controllers/users/users");
const { jwtAuth } = require("../middlewares/jwtAuth");
const cloudinaryMiddleware = require("../middlewares/cloudinary.middleware");
var router = express.Router();

// GET
router.get("/", getAllUsers); // get all users
router.get("/profile", jwtAuth, getUserProfile); //get user profile
router.get("/info/:id", getUserProfileById); //get basic user info

// PUT
router.put(
  "/profile/update/",
  [jwtAuth, cloudinaryMiddleware.single("user_image")],
  updateUserProfile
);
router.put("/profile/update/password", jwtAuth, updateUserPassword);
router.put("/add-matkul/:id/", jwtAuth, updateUserMatkul); //user add matkul
router.put("/delete-matkul/:id/", jwtAuth, deleteUserMatkul); //use delete matkul

module.exports = router;
