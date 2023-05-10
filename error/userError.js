function userMatkulAlreadyAddedError(res) {
  res.status(409).json({
    message: "User already added selected mata kuliah!",
  });
}

function userMatkulDidNotExistsError(res) {
  res.status(409).json({
    message: "User did not have selected mata kuliah!",
  });
}

module.exports = { userMatkulAlreadyAddedError, userMatkulDidNotExistsError };
