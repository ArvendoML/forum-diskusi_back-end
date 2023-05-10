var express = require("express");
const {
  getAllDisccussions,
  createNewDiscussion,
  deleteDiscussion,
  editDiscussionStatus,
  editDiscussion,
  getOneDiscussion,
} = require("../controllers/discussion/discussion");
const { jwtAuth } = require("../middlewares/jwtAuth");
const {
  discussionOwnerAuth,
  discussionImageOwnerAuth,
} = require("../middlewares/users.middleware");
const cloudinaryMiddleware = require("../middlewares/cloudinary.middleware");
const {
  createDiscussionImage,
  getDiscussionImages,
  deleteDiscussionImage,
} = require("../controllers/discussion/discussionImages");
var router = express.Router();

// GET
router.get("/:idMatkul", getAllDisccussions); //get all discussion
router.get("/:idDiscussion/detail", getOneDiscussion); //get one discussion

// POST
router.post("/:idMatkul/create", jwtAuth, createNewDiscussion); //create new discussion

// PUT
router.put("/:idMatkul/edit/:idDiscussion", [jwtAuth, discussionOwnerAuth], editDiscussion); //edit existing discussion
router.put(
  "/:idMatkul/edit/:idDiscussion/status",
  [jwtAuth, discussionOwnerAuth],
  editDiscussionStatus
); //change discussion status

// DELETE
router.delete("/:idMatkul/delete/:idDiscussion", [jwtAuth, discussionOwnerAuth], deleteDiscussion); //delete discussion

// Images //
// Get
router.get("/:idDiscussion/images", getDiscussionImages);

// Post
router.post(
  "/:idDiscussion/images/create",
  [jwtAuth, discussionOwnerAuth, cloudinaryMiddleware.single("discussion_image")],
  createDiscussionImage
);

// Delete
router.delete(
  "/images/:idDiscussionImage/delete",
  [jwtAuth, discussionImageOwnerAuth],
  deleteDiscussionImage
);

module.exports = router;
