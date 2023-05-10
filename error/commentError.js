function commentDidNotExists(res) {
  res.status(404).json({
    message: "Comment not found!",
  });
}

function commentAlreadyLikedDisliked(res) {
  res.status(404).json({
    message: "User already like/dislike comment!",
  });
}

module.exports = { commentDidNotExists, commentAlreadyLikedDisliked };
