const mongoose = require("mongoose");

const assessmentSchema = new mongoose.Schema(
  {
    courseId:{ 
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course", required: true 
    },
    duration:{ 
      type: Number, 
      required: true,
      min: 1 
    },
    status:{ 
      type: String, enum: ["not-started", "in-progress", "submitted"], 
      default: "not-started" 
    },
    TotalMarks: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

const Assessment = mongoose.model("Assessment", assessmentSchema);
module.exports = Assessment;