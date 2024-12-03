const express = require('express');
const moment = require('moment');  // For time manipulation
const Transportation = require('../models/Transportation');  // Model import

const router = express.Router();  // Router creation

// Route to fetch transportation options based on location and rush hour pricing
router.get('/:location', async (req, res) => {
  try {
    const { location } = req.params;  // Get location from URL parameter
    const currentTime = moment().format('HH:mm');  // Get current time in HH:mm format
    const useFlatRate = req.query.flatRate === 'true';  // Check if user selected flatRate in query

    // Find all transportation options for the specified location
    const transportationOptions = await Transportation.find({ location });

    // If no data found for the location, return an error
    if (transportationOptions.length === 0) {
      return res.status(404).json({ success: false, message: `No transportation options found for ${location}` });
    }

    // Process transportation options
    const updatedOptions = transportationOptions.map(option => {
      // Ensure rush hour times are in 'HH:mm' format
      const rushHourStart = moment(option.rushHourStart, 'HH:mm');
      const rushHourEnd = moment(option.rushHourEnd, 'HH:mm');
      const currentTimeMoment = moment(currentTime, 'HH:mm');  // Convert current time to moment object

      if (useFlatRate || option.flatRate) {
        // If flat rate is selected, or the option has flatRate set to true
        option.price = option.basePrice;  // Set price to base price (flat rate)
      } else if (rushHourStart.isValid() && rushHourEnd.isValid()) {
        // Apply rush hour pricing if not flat rate
        if (currentTimeMoment.isBetween(rushHourStart, rushHourEnd)) {
          option.price = option.basePrice * option.rushHourMultiplier;  // Apply multiplier for rush hour
        } else {
          option.price = option.basePrice;  // Use base price if not during rush hour
        }
      } else {
        // If no rush hour info, just use the base price
        option.price = option.basePrice;
      }

      return option;  // Return updated option
    });

    // Return the updated transportation options
    res.json({ success: true, data: updatedOptions });
  } catch (error) {
    console.error('Error fetching data:', error);  // For better debugging
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
