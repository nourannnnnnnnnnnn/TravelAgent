// models/Location.js
const mongoose = require('mongoose');

// Define a schema for a location
const LocationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String },
    description: { type: String },
    coordinates: {
        latitude: { type: Number },
        longitude: { type: Number },
    },
});

module.exports = mongoose.model('Location', LocationSchema);
