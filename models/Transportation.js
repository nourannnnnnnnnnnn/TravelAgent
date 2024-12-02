const mongoose = require('mongoose');

const transportationSchema = new mongoose.Schema({
  location: { type: String, required: true },
  type: { type: String, required: true },
  details: { type: String, required: true },
  basePrice: { type: Number, required: true },
  rushHourMultiplier: { type: Number, default: 1.5 }, // Multiplier for rush hour
  rushHourStart: { type: String }, // Optional: Start time for rush hour (e.g., "08:00")
  rushHourEnd: { type: String }, // Optional: End time for rush hour (e.g., "10:00")
});

const Transportation = mongoose.model('Transportation', transportationSchema);

module.exports = Transportation;
