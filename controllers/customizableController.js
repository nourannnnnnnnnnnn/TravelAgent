// customizableController.js
const customizeTrip = (req, res) => {
 const { location, date, transportation, facilities } = req.body;

 // Calculate price based on selected facilities
 let price = 100; // Base price
 if (facilities && facilities.length > 0) price += facilities.length * 20;

 res.status(200).json({
   success: true,
   message: 'Customized trip booked successfully',
   details: { location, date, transportation, facilities, price },
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

module.exports = { customizeTrip };
