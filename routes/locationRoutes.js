const express = require('express');
const router = express.Router();
const { 
    getLocations, 
    getProgramsByLocation, 
    getTransportationByLocation, 
    saveProgramSelection 
} = require("../controllers/locationController");
const { getAccommodationByLocation } = require("../controllers/accommodationController");

// Route to get all locations
router.get("/", getLocations);

// Route to get programs by location
router.get("/programs/:location", getProgramsByLocation);

// Route to get transportation by location
router.get("/transportation/:location", getTransportationByLocation);

// Route to get accommodation by location (handled by AccommodationController)
router.get("/accommodation/:location", getAccommodationByLocation);

// New POST route for saving program selection
router.post('/programs/select', saveProgramSelection);

module.exports = router;
