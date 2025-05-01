const mongoose = require('mongoose');

const UniversitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  academicLevels: [{
    type: String,
    required: true
  }],
  fieldsOfStudy: [{
    type: String,
    required: true
  }],
  tuition: {
    type: Number,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  ranking: {
    type: Number
  },
  requirements: {
    gpa: Number,
    satScore: Number,
    ieltsScore: Number
  },
  scholarships: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Scholarship'
  }],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('University', UniversitySchema);