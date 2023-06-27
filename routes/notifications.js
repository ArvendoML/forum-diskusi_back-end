var express = require("express");
const { jwtAuth } = require("../middlewares/jwtAuth");
const {
  getAllUserNotifications,
  createNotification,
  deleteNotification,
  deleteAllUserNotifications,
} = require("../controllers/notification/notification");
var router = express.Router();

// GET All User Notification
router.get("/:idUser", jwtAuth, getAllUserNotifications);

// CREATE
router.post("/create", jwtAuth, createNotification);

// DELETE
router.delete("/:idNotification/delete", jwtAuth, deleteNotification);
router.delete("/delete-all", jwtAuth, deleteAllUserNotifications);

module.exports = router;
