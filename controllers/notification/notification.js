const catchError = require("../../error/catchError");
const { getTokenId } = require("../../middlewares/jwtAuth");
const db = require("../../models");

const NOTIFICATIONS_MODEL = db.tbl_notifications;

async function getAllUserNotifications(req, res) {
  const userId = getTokenId(req);

  await NOTIFICATIONS_MODEL.findAll({
    where: {
      id_user: userId,
    },
    order: [["id", "DESC"]],
  })
    .then((data) => {
      return res.status(200).json({
        message: "Success!",
        data: data,
      });
    })
    .catch((error) => {
      catchError(res, error);
    });
}

async function createNotification(req, res) {
  try {
    const { notif_description, id_user, id_matkul, id_discussion } = req.body;

    const dataReq = {
      notif_description: notif_description,
      id_user: id_user,
      id_matkul: id_matkul,
      id_discussion: id_discussion,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await NOTIFICATIONS_MODEL.create(dataReq).then((data) => {
      return res.status(200).json({
        message: "Notification Created Successfully!",
        data: data,
      });
    });
  } catch (error) {
    catchError(res, error);
  }
}

async function deleteNotification(req, res) {
  try {
    const notificationId = parseInt(req.params.idNotification);

    await NOTIFICATIONS_MODEL.destroy({
      where: {
        id: notificationId,
      },
    }).then(() => {
      return res.status(200).json({
        message: "Notification deleted successfully!",
      });
    });
  } catch (error) {
    catchError(res, error);
  }
}

async function deleteAllUserNotifications(req, res) {
  try {
    const userId = getTokenId(req);

    await NOTIFICATIONS_MODEL.destroy({
      where: {
        id_user: userId,
      },
    }).then(() => {
      return res.status(200).json({
        message: "All Notifications deleted successfully!",
      });
    });
  } catch (error) {
    catchError(res, error);
  }
}

module.exports = {
  getAllUserNotifications,
  createNotification,
  deleteNotification,
  deleteAllUserNotifications,
};
