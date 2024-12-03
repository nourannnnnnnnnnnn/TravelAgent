// models/Accommodation.js
const mongoose = require('mongoose');

// Define the schema for accommodations
const accommodationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true }, // You can add more fields as needed
    description: { type: String },
    // Add other fields like amenities, images, etc. as needed
});

// Create the model using the schema
const Accommodation = mongoose.model('Accommodation', accommodationSchema);

// Export the model to use in other files
module.exports = Accommodation;
