const mongoose = require('mongoose');

const LearnerSchema = new mongoose.Schema({
  
  UserID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',         // references the User collection
    required: true
  },
  Level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'], 
    required: false
  },
  Enrollment_Date: {
    type: Date,
    default: Date.now
  },
  Education: {
    type: String,
    required: false
  },
  Field_Of_Interest: {
    type: String,
    required: false
  }
}, {
  timestamps: true       // adds createdAt & updatedAt
});

module.exports = mongoose.model('Learner', LearnerSchema);
