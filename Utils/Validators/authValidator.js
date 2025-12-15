const { check } = require("express-validator");
const slugify = require("slugify");
const validatorMiddleware = require("../../middleware/validatorMiddleware");
const User = require("../../Models/userModel");

exports.signupValidator = [
  check("FName")
    .notEmpty()
    .withMessage("First name must be specified")
    .isLength({ min: 3 })
    .withMessage("First name is too short")
    .isLength({ max: 15 })
    .withMessage("First name is too long")
    .custom((value, { req }) => {
      req.body.slug = slugify(value + " " + req.body.LName, { lower: true });
      return true;
    }),

  check("LName")
    .notEmpty()
    .withMessage("Last name must be specified")
    .isLength({ min: 3 })
    .withMessage("Last name is too short")
    .isLength({ max: 15 })
    .withMessage("Last name is too long"),

  check("Email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is invalid")
    .custom((value) =>
      User.findOne({ Email: value }).then((user) => {
        if (user) {
          return Promise.reject("Email already in use");
        }
      })
    ),
  check("dateOfBirth")
    .notEmpty()
    .withMessage("date of birth is required")
    .isDate()
    .withMessage("date of birth is invalid"),

  check("Password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .custom((value, { req }) => {
      if (value !== req.body.passwordComfirm) {
        throw new Error("Passwords don't match");
      }
      return true;
    }),
  check("passwordComfirm")
    .notEmpty()
    .withMessage("Confirm password is required"),
  check("PhoneNumber")
    .isMobilePhone(["ar-EG", "ar-SA"])
    .withMessage("Invalid phone number, only accept EG and SA phone numbers"),
  check("Gender")
    .notEmpty()
    .withMessage("gender must be specified")
    .isIn(["Male", "Female"])
    .withMessage("invalid gender"),
  check("profileImg").optional(),
  validatorMiddleware,
];

exports.loginValidator = [
  check("Email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email is invalid"),
  check("Password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters"),
  validatorMiddleware,
];
