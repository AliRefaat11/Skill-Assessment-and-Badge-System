const Learner = require("../Models/learnerModel");
const asyncHandler = require("express-async-handler");
const ApiError = require("../Utils/apiError");
const mongoose = require('mongoose');

exports.getAllLearners = asyncHandler(async (req, res, next) => {
  const learners = await Learner.find().populate('userId', 'FName LName Email');
  res.status(200).json({ status: "success", data: learners });
});

exports.getLearnerById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ApiError("Invalid learner ID", 400));
  }
  const learner = await Learner.findById(id).populate('userId', 'FName LName Email');
  if (!learner) {
    return next(new ApiError("Learner not found", 404));
  }
  res.status(200).json({ status: "success", data: learner });
});

exports.getLearnerByUserId = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;
  const learner = await Learner.findOne({ userId: userId }).populate('userId', 'FName LName Email');
  if (!learner) {
    return next(new ApiError("Learner not found", 404));
  }
  res.status(200).json({ status: "success", data: learner });
});

exports.updateLearner = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ApiError("Invalid learner ID", 400));
  }
  const learner = await Learner.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
  if (!learner) {
    return next(new ApiError("Learner not found", 404));
  }
  res.status(200).json({ status: "success", data: learner });
});

exports.deleteLearner = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ApiError("Invalid learner ID", 400));
  }
  await Learner.findByIdAndDelete(id);
  res.status(200).json({ status: "success", message: "Learner deleted successfully" });
});

exports.renderprofile = async (req, res) => {
  const learner = await Learner.findOne({ UserID: req.user._id });
  res.render('pages/learnerprofile', {
      user: req.user,
      learner: learner || null,
      pageCss: '/assets/css/learnerprofile.css'
  });
};