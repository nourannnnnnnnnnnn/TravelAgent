// models/Accommodation.js

const mongoose = require('mongoose');

const accommodationSchema = new mongoose.Schema({
  location: { type: String, required: true },
  type: { type: String, enum: ['single', 'double', 'family'], required: true },
  price: { type: Number, required: true }, // Price per person
});

const Accommodation = mongoose.model('Accommodation', accommodationSchema);

module.exports = Accommodation;
