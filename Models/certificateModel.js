const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: [true, "URL is required"]
    },
    issuedate: {
      type: Date,
      required: [true, "Issue date is required"]
    },
    learnerId: {
      type: mongoose.Schema.ObjectId,
      ref: "Learner",      
      required: [true, "Learner ID is required"]
    },
    courseId: {
      type: mongoose.Schema.ObjectId,
      ref: "Course",
      required: [true, "Course ID is required"]
    }
  }
);

const Certificate = mongoose.model("Certificate", certificateSchema);
module.exports = Certificate;