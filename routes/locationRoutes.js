const express = require('express');
const router = express.Router();
const { getLocations, getProgramsByLocation } = require("../controllers/locationController");
const { getAccommodationByLocation } = require("../controllers/accommodationController"); // Import the new function
const { getTransportationByLocation } = require("../controllers/transportationController");
// Route to get all locations
router.get("/", getLocations);

// Route to get programs by location
router.get("/programs/:location", getProgramsByLocation);

// Route to get accommodation by location (new route)
router.get("/accommodation/:location", getAccommodationByLocation); // New route to get accommodation and calculate price
router.get("/transportation/:location", getTransportationByLocation);
module.exports = router;
