const express = require('express');
const router = express.Router();
const { addTrip, getTrips, calculateTripPrice, getProgramsByLocation, getAccommodationsByLocation, calculateAccommodationPrice } = require('../controllers/tripController');

// Route to add a trip
router.post('/', addTrip);

// Route to get all trips
router.get('/', getTrips);

// Route to calculate the trip price
router.post('/calculatePrice', calculateTripPrice);

// Route to get programs by location
router.get('/programs/:location', getProgramsByLocation);

// Route to get accommodations for a selected location
router.get('/accommodations', getAccommodationsByLocation);

// Route to calculate accommodation price based on type and number of people
router.post('/calculate-accommodation-price', calculateAccommodationPrice);

module.exports = router;
