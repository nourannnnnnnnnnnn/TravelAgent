// allInOneRoutes.js
const express = require('express');
const router = express.Router();
const { getProgramsByLocation, calculateTripPrice } = require('../controllers/allInOneController');

// Route to get programs based on location
router.post('/getPrograms', getProgramsByLocation);

// Route to calculate total price based on user's selections
router.post('/calculatePrice', calculateTripPrice);

module.exports = router;
