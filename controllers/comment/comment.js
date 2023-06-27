const catchError = require("../../error/catchError");
const { commentDidNotExists, commentAlreadyLikedDisliked } = require("../../error/commentError");
const { discussionNotFound } = require("../../error/discussionError");
const { getTokenId } = require("../../middlewares/jwtAuth");
const db = require("../../models");
const { getOneDiscussionById } = require("../discussion/discussion");

const COMMENTS_MODEL = db.tbl_comments;

// GET all comments
async function getAllComments(req, res) {
  const discussionId = parseInt(req.params.idDiscussion);

  const discussion = await getOneDiscussionById(discussionId);
  if (!discussion) return discussionNotFound(res);

  await COMMENTS_MODEL.findAll({
    where: {
      id_discussion: discussionId,
    },
    order: [["id", "ASC"]],
  }).then((data) => {
    return res.status(200).json({
      message: "Success!",
      data: data,
    });
  });
}

async function getOneComment(req, res) {
  const comment = await COMMENTS_MODEL.findOne({
    where: {
      id: parseInt(req.params.idComment),
    },
  });

  if (comment) {
    return res.status(200).json({
      message: "Success!",
      data: comment,
    });
  } else {
    commentDidNotExists(res);
  }
}

// POST new comment
async function createComment(req, res) {
  try {
    const discussionId = parseInt(req.params.idDiscussion);
    const userId = getTokenId(req);
    const { comment_description, reply_from_user, reply_from_comment_desc } = req.body;

    // Check if discussion exists
    const discussion = await getOneDiscussionById(discussionId);
    if (!discussion) return discussionNotFound(res);

    const dataReq = {
      comment_description: comment_description,
      id_discussion: discussionId,
      id_user: userId,
      reply_from_user: reply_from_user || null,
      reply_from_comment_desc: reply_from_comment_desc || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await COMMENTS_MODEL.create(dataReq).then((data) => {
      return res.status(200).json({
        message: "Comment Successfully created!",
        data: data,
      });
    });
  } catch (error) {
    catchError(res, error);
  }
}

// PUT edit comment
async function editComment(req, res) {
  try {
    const commentId = parseInt(req.params.idComment);
    const { comment_description } = req.body;

    const comment = await getOneCommentById(commentId);
    if (!comment) return commentDidNotExists(res);

    const dataReq = {
      comment_description: comment_description,
      updatedAt: new Date(),
    };

    await COMMENTS_MODEL.update(dataReq, {
      where: {
        id: commentId,
      },
    }).then(() => {
      return res.status(200).json({
        message: "Comment updated successfully!",
        data: dataReq,
      });
    });
  } catch (error) {
    catchError(res, error);
  }
}

// PUT like and dislike control
async function commentLike(req, res) {
  try {
    const commentId = parseInt(req.params.idComment);
    const userId = getTokenId(req);

    const comment = await getOneCommentById(commentId);
    if (!comment) return commentDidNotExists(res);

    const { userLike, findUserLike, findUserDislike } = userLikeAndDislike(comment, userId);
    console.log(findUserLike);

    if (findUserLike == 0 && findUserDislike == 0) {
      const dataReq = {
        comment_user_like: [...userLike, userId],
      };

      await COMMENTS_MODEL.update(dataReq, {
        where: {
          id: commentId,
        },
      }).then(() => {
        return res.status(200).json({
          message: "Comment liked successfully!",
          data: dataReq,
        });
      });
    } else {
      commentAlreadyLikedDisliked(res);
    }
  } catch (error) {
    catchError(res, error);
  }
}

async function commentUnLike(req, res) {
  try {
    const commentId = parseInt(req.params.idComment);
    const userId = getTokenId(req);

    const comment = await getOneCommentById(commentId);
    if (!comment) return commentDidNotExists(res);

    const { userLike, findUserLike } = userLikeAndDislike(comment, userId);

    if (findUserLike.length > 0) {
      const dataReq = {
        comment_user_like: userLike.filter((data) => data !== userId),
      };

      await COMMENTS_MODEL.update(dataReq, {
        where: {
          id: commentId,
        },
      }).then(() => {
        return res.status(200).json({
          message: "Comment unliked successfully!",
          data: dataReq,
        });
      });
    } else {
      commentAlreadyLikedDisliked(res);
    }
  } catch (error) {
    catchError(res, error);
  }
}

async function commentDisLike(req, res) {
  try {
    const commentId = parseInt(req.params.idComment);
    const userId = getTokenId(req);

    const comment = await getOneCommentById(commentId);
    if (!comment) return commentDidNotExists(res);

    const { findUserLike, userDislike, findUserDislike } = userLikeAndDislike(comment, userId);

    if (findUserLike == 0 && findUserDislike == 0) {
      const dataReq = {
        comment_user_dislike: [...userDislike, userId],
      };

      await COMMENTS_MODEL.update(dataReq, {
        where: {
          id: commentId,
        },
      }).then(() => {
        return res.status(200).json({
          message: "Comment disliked successfully!",
          data: dataReq,
        });
      });
    } else {
      commentAlreadyLikedDisliked(res);
    }
  } catch (error) {
    catchError(res, error);
  }
}

async function commentUnDisLike(req, res) {
  try {
    const commentId = parseInt(req.params.idComment);
    const userId = getTokenId(req);

    const comment = await getOneCommentById(commentId);
    if (!comment) return commentDidNotExists(res);

    const { userDislike, findUserDislike } = userLikeAndDislike(comment, userId);

    if (findUserDislike.length > 0) {
      const dataReq = {
        comment_user_dislike: userDislike.filter((data) => data !== userId),
      };

      await COMMENTS_MODEL.update(dataReq, {
        where: {
          id: commentId,
        },
      }).then(() => {
        return res.status(200).json({
          message: "Comment undisliked successfully!",
          data: dataReq,
        });
      });
    } else {
      commentAlreadyLikedDisliked(res);
    }
  } catch (error) {
    catchError(res, error);
  }
}

async function deleteComment(req, res) {
  try {
    const commentId = parseInt(req.params.idComment);

    const comment = await getOneCommentById(commentId);
    if (!comment) return commentDidNotExists(res);

    await COMMENTS_MODEL.destroy({
      where: {
        id: commentId,
      },
    }).then(() => {
      return res.status(200).json({
        message: "Comment deleted successfully!",
      });
    });
  } catch (error) {
    catchError(res, error);
  }
}

async function getOneCommentById(id) {
  return await COMMENTS_MODEL.findOne({
    where: {
      id: id,
    },
  });
}

function userLikeAndDislike(comment, userId) {
  const userLike = comment.comment_user_like || [];
  const findUserLike = userLike.filter((user) => user === userId);

  const userDislike = comment.comment_user_dislike || [];
  const findUserDislike = userDislike.filter((user) => user === userId);

  return { userLike, findUserLike, userDislike, findUserDislike };
}

module.exports = {
  getAllComments,
  getOneComment,
  createComment,
  editComment,
  commentLike,
  commentUnLike,
  commentDisLike,
  commentUnDisLike,
  deleteComment,
};
