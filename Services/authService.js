const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const ApiError = require("../Utils/apiError");
const User = require("../Models/userModel");
const Learner = require("../Models/learnerModel");
const { createToken } = require("../Utils/createToken");

exports.signup = asyncHandler(async (req, res, next) => {
  const { FName, LName, Email, Password, PhoneNumber, Gender, dateOfBirth } =
    req.body;

  const hashedPassword = await bcrypt.hash(Password, 10);

  const user = await User.create({
    FName,
    LName,
    Email,
    Password: hashedPassword,
    PhoneNumber,
    Gender,
    dateOfBirth,
    Role: "Learner",
  });

  const learner = await Learner.create({
    UserID: user._id
  });

  const token = createToken(user._id);

  res.redirect('/api/v1/auth/?step=learner');
  res.status(201).json({
    status: "success",
    message: "User created. Complete your learner profile.",
    token,
    UserID: user._id,
    learnerId: learner._id
  });
  res.redirect('/api/v1/auth/?tab=login');
});

exports.login = asyncHandler(async (req, res, next) => {
  const { Email, Password } = req.body;
  const user = await User.findOne({ Email });
  if (!user || !(await bcrypt.compare(Password, user.Password))) {
    return next(new ApiError("Invalid email or password", 401));
  }
  const token = createToken(user._id);
  res.status(201).json({
    status: "success",
    token,
    role: user.Role,
  });
});

exports.auth = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new ApiError("Please login to get access", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(new ApiError("User not found", 401));
  }
  if (user.passwordChangedAt) {
    const passwordChangedTimeStamp = parseInt(
      user.passwordChangedAt.getTime() / 1000,
      10
    );
    if (passwordChangedTimeStamp > decoded.iat) {
      return next(new ApiError("User changed password, please login again", 401));
    }
  }
  req.user = user;
  next();
});

// @desc    Authorization (User Permissions)
exports.allowedTo = (...Roles) =>
  asyncHandler(async (req, res, next) => {
    if (!Roles.includes(req.user.Role)) {
      return next(
        new ApiError("You are not allowed to access this route", 403)
      );
    }
    next();
});

exports.renderAuth = (req, res) => {
    res.render('pages/auth', { user: null });
};