const express = require('express');
const router = express.Router();
const tripController = require('../customizable_controllers/tripController');

// Route to create a new customizable trip
router.post('/create', tripController.createTrip);

// Other routes can be added, such as getting all trips, updating a trip, etc.

module.exports = router;
