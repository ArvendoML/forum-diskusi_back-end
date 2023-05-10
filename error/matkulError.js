function matkulAlreadyExistsError(res) {
  res.status(409).json({
    message: "Mata Kuliah already exists!",
  });
}

function matkulDidNotExistsError(res) {
  res.status(404).json({
    message: "Mata kuliah not found!",
  });
}

module.exports = { matkulAlreadyExistsError, matkulDidNotExistsError };
