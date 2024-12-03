const Location = require('../models/Location'); // Import Location model
const Program = require('../models/program'); // Import Program model
const Transportation = require('../models/Transportation'); // Import Transportation model
const User = require('../models/User');  // Import User model for validation
const UserProgramSelection = require('../models/UserProgramSelection');  // Correct model import

// Function to get all locations
const getLocations = async (req, res) => {
    try {
        const locations = await Location.find();
        res.status(200).json(locations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching locations', error: error.message });
    }
};

// Function to get programs by location
const getProgramsByLocation = async (req, res) => {
    const location = req.params.location;
    try {
        const programs = await Program.find({ location });
        res.status(200).json(programs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching programs', error: error.message });
    }
};

// Function to get transportation by location
const getTransportationByLocation = async (req, res) => {
    const location = req.params.location;
    try {
        const transportation = await Transportation.find({ location });
        res.status(200).json(transportation);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching transportation', error: error.message });
    }
};

// Function to save program selection
const saveProgramSelection = async (req, res) => {
    const { userId, location, programId, accommodationId, transportationId } = req.body;

    // Validate required fields
    if (!userId || !location || !programId || !accommodationId || !transportationId) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Save program selection
        const selection = new UserProgramSelection({
            userId,
            location,
            programId,
            accommodationId,
            transportationId
        });

        await selection.save();
        res.status(201).json({ message: 'Program selection saved successfully!', selection });
    } catch (error) {
        res.status(500).json({ message: 'Failed to save program selection', error: error.message });
    }
};

module.exports = {
    getLocations,
    getProgramsByLocation,
    getTransportationByLocation,
    saveProgramSelection
};
