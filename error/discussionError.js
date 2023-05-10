function discussionNotFound(res) {
  res.status(404).json({
    message: "Discussion not found!",
  });
}

function discussionImageNotFound(res) {
  res.status(404).json({
    message: "Image not found!",
  });
}

module.exports = { discussionNotFound, discussionImageNotFound };
