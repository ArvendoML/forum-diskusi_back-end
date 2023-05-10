function authError(res) {
  res.status(401).json({ message: "Email/Password Invalid!" });
}

module.exports = authError;
