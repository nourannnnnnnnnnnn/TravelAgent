const mongoose = require('mongoose');

const CustomizableTripSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    activities: { type: [String], required: true },
    price: { type: Number, required: true },
    duration: { type: String, required: true }
});

module.exports = mongoose.model('CustomizableTrip', CustomizableTripSchema);
