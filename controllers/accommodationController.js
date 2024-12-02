const Accommodation = require("../models/Accommodation");

// Function to calculate total accommodation price
const getAccommodationByLocation = (req, res) => {
  const location = req.params.location;  // Get the location from URL params
  const { type, numberOfDays } = req.query;  // Get room type and number of days from query params

  // Validate input
  if (!numberOfDays || isNaN(numberOfDays) || numberOfDays <= 0) {
    return res.status(400).json({ message: "Invalid number of days." });
  }

  // Fetch accommodation data based on location and type (optional)
  const query = { location: location };
  if (type) query.type = type;  // Filter by room type if provided

  Accommodation.find(query)
    .then(accommodations => {
      if (accommodations.length > 0) {
        // Calculate total price for each accommodation
        const result = accommodations.map(accommodation => {
          const totalPrice = accommodation.price * numberOfDays; // Calculate price based on number of days
          return {
            ...accommodation.toObject(),
            totalPrice: totalPrice, // Add totalPrice field to result
          };
        });

        res.json(result);  // Return the accommodation data along with total price
      } else {
        res.status(404).json({ message: "No accommodation found for this location" });
      }
    })
    .catch(err => res.status(500).json({ message: err.message }));
};

module.exports = { getAccommodationByLocation };
