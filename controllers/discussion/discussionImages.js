const catchError = require("../../error/catchError");
const { discussionImageNotFound } = require("../../error/discussionError");
const { getTokenId } = require("../../middlewares/jwtAuth");
const db = require("../../models");
const cloudinaryUploadImage = require("../../utils/cloudinaryUploadImage");

const DISCUSSIONIMAGES_MODEL = db.tbl_discussionImages;

async function getDiscussionImages(req, res) {
  try {
    const discussionId = req.params.idDiscussion;

    await DISCUSSIONIMAGES_MODEL.findAll({
      where: {
        id_discussion: discussionId,
      },
    }).then((data) => {
      res.status(200).json({
        message: "Success!",
        data: data,
      });
    });
  } catch (error) {
    catchError(res, error);
  }
}

async function createDiscussionImage(req, res) {
  try {
    const imageUrl = await cloudinaryUploadImage(req, "forum-diskusi/discussion-image");
    const userId = getTokenId(req);
    const discussionId = req.params.idDiscussion;

    const dataReq = {
      discussionImageUrl: imageUrl,
      id_discussion: discussionId,
      id_user: userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await DISCUSSIONIMAGES_MODEL.create(dataReq).then((data) => {
      res.status(200).json({
        message: "Disuccsion image added successfully",
        data: data,
      });
    });
  } catch (error) {
    catchError(res, error);
  }
}

async function deleteDiscussionImage(req, res) {
  try {
    const discussionImageId = req.params.idDiscussionImage;

    const discussionImage = findOneDiscussionImage(discussionImageId);
    if (!discussionImage) return discussionImageNotFound(res);

    await DISCUSSIONIMAGES_MODEL.destroy({
      where: {
        id: discussionImageId,
      },
    }).then(() => {
      return res.status(200).json({
        message: "Discussion image deleted successfully!",
      });
    });
  } catch (error) {
    catchError(res, error);
  }
}

async function findOneDiscussionImage(id) {
  return await DISCUSSIONIMAGES_MODEL.findOne({
    where: {
      id: id,
    },
  });
}

module.exports = { getDiscussionImages, createDiscussionImage, deleteDiscussionImage };
