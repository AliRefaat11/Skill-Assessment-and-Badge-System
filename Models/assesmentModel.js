const mongoose = require("mongoose");

const assessmentSchema = new mongoose.Schema(
  {
    skillId:{ 
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skill", 
      required: true 
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
      required: true,
      default: 0 
    }
  },
  { timestamps: true }
);

const Assessment = mongoose.model("Assessment", assessmentSchema);
module.exports = Assessment;