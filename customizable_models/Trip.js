const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  location: { type: String, required: true },
  accommodation: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  transportation: { type: [String], required: true },
  extraFacilities: { type: [String], default: [] },
});

module.exports = mongoose.model('Trip', tripSchema);
