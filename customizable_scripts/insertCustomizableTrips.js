const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const CustomizableTrip = require('../customizable_models/CustomizableTrip'); // Import the model

// Database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected for inserting customizable trips');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

// Example array of customizable trips
const tripsData = [
    {
        name: "Adventure in Cairo",
        description: "Explore the historic wonders of Cairo.",
        price: 500,
        duration: "3 days",
        location: "Cairo",
        activities: ["Museum visit", "Pyramids tour", "Nile cruise"]
    },
    {
        name: "Beach Paradise in Alexandria",
        description: "Relax on the beautiful beaches of Alexandria.",
        price: 700,
        duration: "5 days",
        location: "Alexandria",
        activities: ["Beach day", "Historical city tour", "Seafood dinner"]
    },
    {
        name: "Luxor and Aswan Nile Cruise",
        description: "A luxurious cruise along the Nile, visiting ancient temples.",
        price: 1500,
        duration: "7 days",
        location: "Luxor",
        activities: ["Temple visit", "Cruise parties", "Local cultural events"]
    }
];

// Insert the trips into the database
const insertTrips = async () => {
    try {
        const result = await CustomizableTrip.insertMany(tripsData);
        console.log(`${result.length} customizable trips inserted successfully`);
    } catch (error) {
        console.error('Error inserting customizable trips:', error);
    } finally {
        mongoose.connection.close();
    }
};

insertTrips();
