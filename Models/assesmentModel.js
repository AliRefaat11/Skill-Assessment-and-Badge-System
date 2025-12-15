const mongoose = require("mongoose");

const assessmentSchema = new mongoose.Schema(
  {
    courseId:{ 
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course", required: true 
    },
    learnerId:{
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Learner", required: true 
    },
    durationMins:{ 
      type: Number, 
      required: true, min: 1 
    },
    status:{ 
      type: String, enum: ["not-started", "in-progress", "submitted"], 
      default: "not-started" 
    },
    totalQuestions:{ 
      type: Number, 
      default: 0 
    },
    score:{ 
      type: Number, 
      default: 0, 
      min: 0 
    },
    grade:{ 
      type: String, 
      trim: true 
    },
    passed:{ 
      type: Boolean, 
      default: false 
    },
    submittedAt:{ 
      type: Date 
    }
  },
  { timestamps: true }
);

assessmentSchema.methods.evaluatePassFail = function() {
  const percent = this.totalQuestions ? (this.score / this.totalQuestions) * 100 : 0;
  this.passed = percent >= 70;
  return this.passed;
};

const Assessment = mongoose.model("Assessment", assessmentSchema);
module.exports = Assessment;