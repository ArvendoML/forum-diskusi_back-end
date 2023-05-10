var express = require("express");
const {
  getAllComments,
  createComment,
  commentLike,
  commentUnLike,
  commentDisLike,
  commentUnDisLike,
  editComment,
  getOneComment,
  deleteComment,
} = require("../controllers/comment/comment");
const { jwtAuth } = require("../middlewares/jwtAuth");
const { commentOwnerAuth } = require("../middlewares/users.middleware");
var router = express.Router();

// GET Request
router.get("/:idDiscussion", getAllComments);
router.get("/:idComment/detail", getOneComment);

// POST
router.post("/:idDiscussion/create", jwtAuth, createComment);

// PUT
router.put("/:idDiscussion/edit/:idComment", [jwtAuth, commentOwnerAuth], editComment);
router.put("/:idDiscussion/like/:idComment", jwtAuth, commentLike);
router.put("/:idDiscussion/unlike/:idComment", jwtAuth, commentUnLike);
router.put("/:idDiscussion/dislike/:idComment", jwtAuth, commentDisLike);
router.put("/:idDiscussion/undislike/:idComment", jwtAuth, commentUnDisLike);

// DELETE
router.delete("/:idDiscussion/delete/:idComment", [jwtAuth, commentOwnerAuth], deleteComment);

module.exports = router;
