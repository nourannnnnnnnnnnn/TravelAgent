const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true
  },
  program: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  basePrice: {  // Add basePrice field
    type: Number,
    required: true
  }
});

const Program = mongoose.model('Program', programSchema);
module.exports = Program;
