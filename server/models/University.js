const mongoose = require('mongoose');

const UniversitySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  zip: {
    type: String
  },
  schoolType: {
    type: String
  },
  website: {
    type: String
  },
  studentSize: {
    type: Number
  },
  admissionRate: {
    type: Number
  },
  tuition: {
    inState: Number,
    outOfState: Number
  },
  completionRate: {
    type: Number
  },
  retentionRate: {
    type: Number
  },
  earnings: {
    median: Number,
    mean: Number
  },
  programs: [{
    name: String,
    level: String,
    cipCode: String
  }],
  location: {
    lat: Number,
    lon: Number
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('University', UniversitySchema);