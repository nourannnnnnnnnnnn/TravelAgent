// allInOneController.js
const { programs, accommodations, transportation } = require('../config/config');

const getProgramsByLocation = (req, res) => {
  const location = req.body.location;
  if (!programs[location]) {
    return res.status(404).json({ message: 'Programs not found for this location' });
  }
  res.status(200).json({ programs: programs[location] });
};

const calculateTripPrice = (req, res) => {
  const { location, accommodation, transportation } = req.body;

  let price = 100; // Base price

  // Add price based on accommodation
  if (accommodation === 'double') price += 50;
  else if (accommodation === 'family') price += 100;

  // Add price based on transportation
  if (transportation === 'car') price += 100;
  else if (transportation === 'privateCar') price += 200;

  res.status(200).json({
    success: true,
    message: 'Trip price calculated successfully',
    price,
  });
};

const { calculatePrice } = require('../utils/priceCalculator');  // Import the calculatePrice function

// Controller function to handle price calculation for a trip
exports.calculateTripPrice = (req, res) => {
  const { accommodation, transportation, facilities } = req.body;

  try {
    // Call the price calculation logic
    const price = calculatePrice({ accommodation, transportation, facilities });

    // Respond with the calculated price
    res.status(200).json({
      success: true,
      message: 'Trip price calculated successfully',
      price,  // Send back the price
    });
  } catch (error) {
    // Handle any errors (e.g., invalid data)
    res.status(400).json({ error: error.message });
  }
};


module.exports = { getProgramsByLocation, calculateTripPrice };
