const Location = require('../models/Location'); // Location model
const Program = require('../models/program'); // Program model
const Transportation = require('../models/Transportation'); // Transportation model

const saveProgramSelection = async (req, res) => {
    try {
        const { userId, locationName, programName, transportationName } = req.body;

        // Validate required fields
        if (!userId || !locationName || !programName || !transportationName) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Fetch location ID by location name
        const location = await Location.findOne({ name: locationName });
        if (!location) {
            return res.status(404).json({ message: 'Location not found.' });
        }

        // Fetch program ID by location name and program name
        const program = await Program.findOne({ location: locationName, program: programName });
        if (!program) {
            return res.status(404).json({ message: 'Program not found.' });
        }

        // Fetch transportation ID by transportation name
        const transportation = await Transportation.findOne({ name: transportationName });
        if (!transportation) {
            return res.status(404).json({ message: 'Transportation not found.' });
        }

        // Create a new program selection document
        const selection = new ProgramSelection({
            userId,
            location: location._id,
            programId: program._id,
            transportationId: transportation._id
        });

        // Save to the database
        await selection.save();

        // Respond with success
        return res.status(201).json({
            message: 'Program selection saved successfully!',
            selection
        });
    } catch (error) {
        console.error('Error saving program selection:', error);

        // Respond with error
        res.status(500).json({
            message: 'Failed to save program selection',
            error: error.message
        });
    }
};
