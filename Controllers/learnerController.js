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

exports.createLearner = asyncHandler(async (req, res, next) => {
  const { UserID } = req.user_id;
  const {education, specialization, fieldOfInterest, Level } = req.body;
  const learner = await Learner.findOne({ UserID });
  
  if (!learner) {
    return next(new ApiError("Learner profile not found. Please sign up first.", 404));
  }

  learner.Education = education;
  learner.Specialization = specialization;
  learner.Field_Of_Interest = fieldOfInterest;
  learner.Level = Level;  
  await learner.save();

  res.status(200).json({ 
    status: "success", 
    message: "Learner profile completed successfully",
    data: learner 
  });
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

exports.renderprofile = (req, res) => {
    res.render('pages/learnerprofile');
};