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
  academicLevel: {
    type: String,
    required: true
  },
  interests: {
    type: [String],
    default: []
  },
  savedUniversities: [{
    id: String, // College Scorecard ID
    name: String,
    state: String,
    city: String,
    website: String
    // Add more fields if needed
  }],
  preferences: {
    location: String,
    tuitionRange: String,
    size: String,
    ranking: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);