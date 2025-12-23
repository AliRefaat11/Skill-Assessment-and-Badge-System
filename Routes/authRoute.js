const express = require("express");
const { signup, login, logout, renderAuth} = require("../Services/authService");

const {
  signupValidator,
  loginValidator,
} = require("../utils/validators/authValidator");
// const { uploadUserImage, resizeImage } = require("../utils/images");

const router = express.Router();

router.route("/").get(renderAuth);
router.route("/signup").post(signupValidator, signup);
router.route("/login").post(loginValidator, login);
router.route("/logout").get(logout);

module.exports = router;