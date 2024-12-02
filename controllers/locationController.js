// locationController.js
const Program = require("../models/program");


const getLocations = (req, res) => {
  // Logic to fetch all locations (if needed)
  res.send("Our Locations are  Cairo,Alexandria,Luxor,Aswan & Giza");
};

const getProgramsByLocation = (req, res) => {
  const location = req.params.location; // Get the location from the URL params
  Program.find({ location: location }) // Find programs matching the location
    .then(programs => {
      if (programs.length > 0) {
        res.json(programs); // Return programs if found
      } else {
        res.status(404).json({ message: "No programs found for this location" });
      }
    })
    .catch(err => res.status(500).json({ message: err.message }));
};

module.exports = { getLocations, getProgramsByLocation };
