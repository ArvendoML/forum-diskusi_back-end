var express = require("express");
const { userRegister, userLogin } = require("../controllers/users/auth");
var router = express.Router();

// POST
router.post("/login", userLogin);
router.post("/register", userRegister);

module.exports = router;
