const mongoose = require('mongoose');

const CustomizableTripSchema = new mongoose.Schema({
    location: { type: String, required: true },
    date: { type: String, required: true },
    transportation: { type: String, required: true },
    facilities: { type: [String], default: [] },
    price: { type: Number, required: true },
});

module.exports = mongoose.model('CustomizableTrip', CustomizableTripSchema);
