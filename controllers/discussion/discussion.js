const catchError = require("../../error/catchError");
const { discussionNotFound } = require("../../error/discussionError");
const inputError = require("../../error/inputError");
const { matkulDidNotExistsError } = require("../../error/matkulError");
const { getTokenId } = require("../../middlewares/jwtAuth");
const { getOneMatkulById } = require("../matkul/matkul");
const db = require("../../models");

const DISCUSSIONS_MODEL = db.tbl_discussions;

// Get all Disccusions
async function getAllDisccussions(req, res) {
  const matkulId = parseInt(req.params.idMatkul);

  await DISCUSSIONS_MODEL.findAll({
    where: {
      id_matkul: matkulId,
    },
    order: [["id", "ASC"]],
  }).then((data) => {
    return res.status(200).json({
      message: "Success!",
      data: data,
    });
  });
}

// Get a Discussion
async function getOneDiscussion(req, res) {
  const discussion = await DISCUSSIONS_MODEL.findOne({
    where: {
      id: parseInt(req.params.idDiscussion),
    },
  });

  if (discussion) {
    return res.status(200).json({
      message: "Success!",
      data: discussion,
    });
  } else {
    discussionNotFound(res);
  }
}

// Create new Disccusion
async function createNewDiscussion(req, res) {
  try {
    const matkulId = parseInt(req.params.idMatkul);
    const userId = getTokenId(req);
    const { discussion_title, discussion_description } = req.body;

    // check if input blank
    if (discussion_title === "" || null || discussion_description === "" || null) {
      return inputError(res);
    }

    // check if matkul exist
    const matkul = await getOneMatkulById(matkulId);
    if (!matkul) return matkulDidNotExistsError(res);

    const dataReq = {
      discussion_title: discussion_title,
      discussion_description: discussion_description,
      discussion_status: false,
      id_matkul: matkulId,
      id_user: userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await DISCUSSIONS_MODEL.create(dataReq).then((data) => {
      return res.status(200).json({
        message: "Discussion created successfully!",
        data: data,
      });
    });
  } catch (error) {
    catchError(res, error);
  }
}

// Edit Discussion
async function editDiscussion(req, res) {
  try {
    const { discussion_title, discussion_description } = req.body;
    const discussionId = parseInt(req.params.idDiscussion);

    // Check if discussion exist
    const discussion = await getOneDiscussionById(discussionId);
    if (!discussion) return discussionNotFound(res);

    const dataReq = {
      discussion_title: discussion_title,
      discussion_description: discussion_description,
      updatedAt: new Date(),
    };

    await DISCUSSIONS_MODEL.update(dataReq, {
      where: {
        id: discussionId,
      },
    }).then(() => {
      return res.status(200).json({
        message: "Discussion updated successfully!",
        data: dataReq,
      });
    });
  } catch (error) {
    catchError(res, error);
  }
}

// Edit Discussion status (Complete or Not)
async function editDiscussionStatus(req, res) {
  try {
    const discussionId = parseInt(req.params.idDiscussion);

    // Check if discussion exist
    const discussion = await getOneDiscussionById(discussionId);
    if (!discussion) return discussionNotFound(res);

    const dataReq = {
      discussion_status: discussion.discussion_status === true ? false : true,
      updatedAt: new Date(),
    };

    await DISCUSSIONS_MODEL.update(dataReq, {
      where: {
        id: discussionId,
      },
    }).then(() => {
      return res.status(200).json({
        message: "Discussion updated successfully!",
        data: dataReq,
      });
    });
  } catch (error) {
    catchError(res, error);
  }
}

// Delete Discussion
async function deleteDiscussion(req, res) {
  try {
    const discussionId = parseInt(req.params.idDiscussion);

    // Check if discussion exist
    const discussion = await getOneDiscussionById(discussionId);
    if (!discussion) return discussionNotFound(res);

    await DISCUSSIONS_MODEL.destroy({
      where: {
        id: discussionId,
      },
    }).then(() => {
      return res.status(200).json({
        message: "Discussion deleted successfully!",
      });
    });
  } catch (error) {
    catchError(res, error);
  }
}

// Get a Discussion
async function getOneDiscussionById(id) {
  return await DISCUSSIONS_MODEL.findOne({
    where: {
      id: id,
    },
  });
}

module.exports = {
  getAllDisccussions,
  getOneDiscussion,
  createNewDiscussion,
  editDiscussion,
  editDiscussionStatus,
  deleteDiscussion,
  getOneDiscussionById,
};
