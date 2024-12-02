// accommodationRoutes.js
const express = require('express');
const router = express.Router();
const Accommodation = require('../models/Accommodation'); // Ensure this is the correct path

// Define the route to get accommodations by location
router.get('/:location', async (req, res) => {
  try {
    const accommodations = await Accommodation.find({ location: req.params.location });

    if (accommodations.length === 0) {
      return res.status(404).json({ message: 'No accommodations found for this location' });
    }

    res.json(accommodations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
