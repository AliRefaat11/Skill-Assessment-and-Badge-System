const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const ApiError = require("../Utils/apiError");
const User = require("../Models/userModel");
const { createToken } = require("../Utils/createToken");

// @desc    signup user
// @route   GET /api/v1/auth/signup
// @access  public
exports.signup = asyncHandler(async (req, res, next) => {
  const { fName, lName, email, password, phone, gender, dateOfBirth } =
    req.body;

  const user = await User.create({
    FName: fName,
    LName: lName,
    email,
    password,
    phone,
    gender,
    dateOfBirth,
    role: "Learner",
  });
  const token = createToken(user._id);
  res.status(201).json({
    status: "success",
    token,
    role: user.role,
  });
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new ApiError("Invalid email or password", 401));
  }
  const token = createToken(user._id);
  res.status(201).json({
    status: "success",
    token,
    role: user.role,
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
  const passwordChangedTimeStamp = parseInt(
    user.passwordChangedAt.getTime() / 1000,
    10
  );
  if (passwordChangedTimeStamp > decoded.iat) {
    return next(new ApiError("user changed password, login again", 401));
  }
  req.user = user;
  next();
});

// @desc    Authorization (User Permissions)
exports.allowedTo = (...roles) =>
  asyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError("You are not allowed to access this route", 403)
      );
    }
    next();
  });