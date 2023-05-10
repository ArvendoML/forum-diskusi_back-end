function inputError(res) {
  res.status(422).json({
    message: "Please fill the blank input!",
  });
}

module.exports = inputError;


