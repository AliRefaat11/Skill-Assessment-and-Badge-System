const express = require("express");
const { signup, login } = require("../Services/authService");

const {
  signupValidator,
  loginValidator,
} = require("../utils/validators/authValidator");
// const { uploadUserImage, resizeImage } = require("../utils/images");

const router = express.Router();

router.route("/signup").post(signupValidator, signup);
router.route("/login").post(loginValidator, login);

module.exports = router;