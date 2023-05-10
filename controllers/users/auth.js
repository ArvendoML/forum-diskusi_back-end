require("dotenv").config();
const authError = require("../../error/authError");
const catchError = require("../../error/catchError");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../../models");

const USERS_MODEL = db.tbl_users;
const salt = process.env.SALT;
const secretKey = process.env.JWT_SECRET_KEY;

// Register User
async function userRegister(req, res) {
  try {
    const { user_name, user_nim, user_email, user_password } = req.body;

    // Check if User already exists
    const user = await USERS_MODEL.findOne({ where: { user_email: user_email } });
    if (user) return res.status(401).json({ message: "User already exists!" });

    // encrypt password
    let hashPassword = bcrypt.hashSync(user_password + salt, 12);

    const dataReq = {
      user_name: user_name,
      user_nim: user_nim,
      user_email: user_email,
      user_password: hashPassword,
      id_role: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await USERS_MODEL.create(dataReq).then((data) => {
      return res.status(201).json({
        message: "Register Success!",
        data: data,
      });
    });
  } catch (error) {
    catchError(res, error);
  }
}
// Login User
async function userLogin(req, res) {
  try {
    const { user_email, user_password } = req.body;

    if (user_email !== "" || user_password !== "") {
      // Find User
      const user = await USERS_MODEL.findOne({
        where: { user_email: user_email },
      });
      if (!user) return authError(res);

      // Match Password
      const matchPass = await bcrypt.compare(user_password + salt, user.user_password);
      if (!matchPass) return authError(res);

      // Get Token
      const accessToken = authorize(user.id, user.user_name, user.user_nim, user.id_role);

      return res.status(200).json({
        message: "Login Success!",
        token: accessToken,
      });
    }
  } catch (error) {
    catchError(res, error);
  }
}

function authorize(id, username, nim, role) {
  const expireKey = "2h";

  const tokenAccess = jwt.sign(
    {
      id: id,
      username: username,
      nim: nim,
      role: role,
    },
    secretKey,
    {
      algorithm: "HS256",
      expiresIn: expireKey,
    }
  );

  return tokenAccess;
}

module.exports = {
  userRegister,
  userLogin,
};
