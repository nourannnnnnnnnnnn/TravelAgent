// routes/accommodationRoutes.js
const express = require('express');
const Accommodation = require('../customizable_models/Accommodation'); // Your model
const router = express.Router();

// Route for getting accommodations based on location
router.get('/:location', async (req, res) => {
  const { location } = req.params;

  try {
    const accommodations = await Accommodation.find({ location: location });

    if (accommodations.length > 0) {
      res.json(accommodations);
    } else {
      res.status(404).json({ message: 'No accommodations found for this location' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching accommodations', error });
  }
});

module.exports = router;
