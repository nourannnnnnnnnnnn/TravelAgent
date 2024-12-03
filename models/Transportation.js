const mongoose = require('mongoose');

// Define schema for transportation data
const transportationSchema = new mongoose.Schema({
  location: { type: String, required: true },
  type: { type: String, required: true },
  details: { type: String, required: true },
  price: { type: Number, required: true },
  rushHourStart: { type: String, required: true },
  rushHourEnd: { type: String, required: true },
  rushHourMultiplier: { type: Number, default: 1.0 },
  basePrice: { type: Number, required: true },
  flatRate: { type: Boolean, default: false }
});

// Create and export the model based on the schema
const Transportation = mongoose.model('Transportation', transportationSchema);

module.exports = Transportation;
