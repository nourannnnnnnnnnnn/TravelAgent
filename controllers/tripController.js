const Trip = require('../models/Trip');
const Accommodation = require('../models/Accommodation'); // Correct path to the model
const Program = require('../models/program'); // Assuming Program model exists
const { calculatePrice } = require('../utils/priceCalculator');  // Import the calculatePrice function

// Controller function to add a new trip
const addTrip = async (req, res) => {
  try {
    const { location, program, accommodation, transportation, userId } = req.body;
    const price = await calculateTripPrice({ location, accommodation, transportation });  // Calculate price logic here

    const newTrip = new Trip({ location, program, accommodation, price, transportation, userId });
    await newTrip.save();

    res.status(201).json({ message: 'Trip added successfully', trip: newTrip });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to get all trips
const getTrips = async (req, res) => {
  try {
    const trips = await Trip.find();
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to calculate trip price
const calculateTripPrice = async (req, res) => {
  const { location, accommodation, transportation, facilities } = req.body;

  try {
    // Call the price calculation logic
    const price = await calculatePrice({ accommodation, transportation, facilities });

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

// Controller function to get programs by location
const getProgramsByLocation = async (req, res) => {
  const location = req.params.location; // Get location from URL parameter

  try {
    // Query programs from the database based on the location
    const programs = await Program.find({ location: location });

    if (programs.length > 0) {
      return res.status(200).json(programs);  // Return found programs
    } else {
      return res.status(404).json({ message: 'No programs found for this location' });  // No programs found
    }
  } catch (error) {
    res.status(500).json({ error: error.message });  // Handle errors
  }
};

// Controller function to get accommodations by location
const getAccommodationsByLocation = async (req, res) => {
  const location = req.query.location; // Get the location from query parameters

  try {
    // Query accommodations based on location
    const accommodations = await Accommodation.find({ location: location });

    if (accommodations.length > 0) {
      // Return accommodations if found
      res.status(200).json(accommodations);
    } else {
      // Return a 404 if no accommodations found for the location
      res.status(404).json({ message: 'No accommodations found for this location' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to calculate accommodation price
const calculateAccommodationPrice = async (req, res) => {
  const { accommodationType, numOfPeople } = req.body; // Get accommodation type and number of people from request body

  try {
    // Find accommodation based on type
    const accommodation = await Accommodation.findOne({ type: accommodationType });

    if (!accommodation) {
      return res.status(404).json({ message: 'Accommodation type not found' });
    }

    // Calculate the total price based on accommodation type and number of people
    const totalPrice = accommodation.price * numOfPeople;

    res.status(200).json({
      success: true,
      totalPrice,
      message: 'Price calculated successfully',
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Export all controller functions at once
module.exports = { 
  addTrip, 
  getTrips, 
  calculateTripPrice, 
  getProgramsByLocation, 
  getAccommodationsByLocation, 
  calculateAccommodationPrice 
};
