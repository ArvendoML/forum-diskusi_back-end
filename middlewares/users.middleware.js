const commentDidNotExists = require("../error/commentError");
const { discussionNotFound, discussionImageNotFound } = require("../error/discussionError");
const db = require("../models");
const { getTokenId, getTokenRole } = require("./jwtAuth");

const DISCUSSIONS_MODEL = db.tbl_discussions;
const COMMENTS_MODEL = db.tbl_comments;
const DISCUSSIONIMAGES_MODEL = db.tbl_discussionImages;

const discussionOwnerAuth = async (req, res, next) => {
  try {
    const userId = getTokenId(req);
    const userRole = getTokenRole(req);
    const discussionId = parseInt(req.params.idDiscussion);

    const discussion = await DISCUSSIONS_MODEL.findOne({
      where: { id: discussionId },
    });
    if (!discussion) return discussionNotFound(res);

    if (userRole === 1) {
      next();
    } else if (discussion.id_user !== userId) {
      res.status(401).json({
        message: "Not Authorized!",
      });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const discussionImageOwnerAuth = async (req, res, next) => {
  try {
    const userId = getTokenId(req);
    const userRole = getTokenRole(req);
    const discussionImageId = parseInt(req.params.idDiscussionImage);

    const discussionImage = await DISCUSSIONIMAGES_MODEL.findOne({
      where: { id: discussionImageId },
    });
    if (!discussionImage) return discussionImageNotFound(res);

    if (userRole === 1) {
      next();
    } else if (discussionImage.id_user !== userId) {
      res.status(401).json({
        message: "Not Authorized!",
      });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const commentOwnerAuth = async (req, res, next) => {
  try {
    const userId = getTokenId(req);
    const userRole = getTokenRole(req);
    const commentId = parseInt(req.params.idComment);

    const comment = await COMMENTS_MODEL.findOne({
      where: { id: commentId },
    });
    if (!comment) return commentDidNotExists(res);

    if (userRole === 1) {
      next();
    } else if (comment.id_user !== userId) {
      res.status(401).json({
        message: "Not Authorized!",
      });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const roleAuth = async (req, res, next) => {
  try {
    const userRole = getTokenRole(req);

    if (userRole === 1) {
      next();
    } else {
      res.status(401).json({
        message: "Not Authorized!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { discussionOwnerAuth, discussionImageOwnerAuth, commentOwnerAuth, roleAuth };
