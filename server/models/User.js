js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  academicProfile: {
    gpa: Number,
    satScore: Number,
    ieltsScore: Number,
    interests: [String],
    budget: Number
  },
  savedUniversities: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'University'
  }],
  savedScholarships: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Scholarship'
  }],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);