const express = require('express');
const moment = require('moment');  // Import Moment.js for time manipulation
const Transportation = require('../models/Transportation');  // Correct path to your model

const router = express.Router();  // Create the router

// Route to fetch transportation based on location and adjust price for rush hour
router.get('/:location', async (req, res) => {
  try {
    const { location } = req.params;  // Get the location from the URL
    const currentTime = moment().format('HH:mm');  // Get current time in HH:mm format

    // Find all transportation options for the specified location
    const transportationOptions = await Transportation.find({ location });

    // Adjust prices based on rush hour
    const updatedOptions = transportationOptions.map(option => {
      if (option.rushHourStart && option.rushHourEnd) {
        // Check if the current time is within rush hour
        if (moment(currentTime).isBetween(option.rushHourStart, option.rushHourEnd)) {
          option.basePrice *= option.rushHourMultiplier;  // Apply rush hour price adjustment
        }
      }
      return option;
    });

    // Return the updated transportation options with adjusted prices
    res.json({ success: true, data: updatedOptions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;  // Export the router
