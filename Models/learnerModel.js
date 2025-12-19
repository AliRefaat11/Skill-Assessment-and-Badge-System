const mongoose = require('mongoose');

const LearnerSchema = new mongoose.Schema({
  
  UserID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  Level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner', 
    required: false
  },
  Enrollment_Date: {
    type: Date,
    default: Date.now
  },
  Education: {
    type: String,
    enum: ['High School', 'Bachelor', 'Master', 'Doctorate', 'Other'],
    required: false
  },
}, {
  timestamps: true
});

const Learner = mongoose.model('Learner', LearnerSchema);
module.exports = Learner;