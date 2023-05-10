function catchError(res, error) {
  res.status(422).json({
    message: error.message,
  });
}

module.exports = catchError;