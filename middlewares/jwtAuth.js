require("dotenv").config();
const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET_KEY;

// Authenticate User
const jwtAuth = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (authHeader) {
      const token = authHeader.split("Bearer ")[0];
      const secretKeyJWT = secretKey;

      jwt.verify(token, secretKeyJWT, (err, user) => {
        if (err) {
          return res.status(403).json({
            message: err.message,
          });
        }
        req.user = user;
        next();
      });
    } else {
      res.status(401).json({
        message: "Not Authorized!",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Decode Token
const getTokenId = (req) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split("Bearer ")[0];
  const decoded = jwt.decode(token, secretKey, { complete: true });

  return decoded.id;
};

const getTokenRole = (req) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split("Bearer ")[0];
  const decoded = jwt.decode(token, secretKey, { complete: true });

  return decoded.role;
};

module.exports = { jwtAuth, getTokenId, getTokenRole };
