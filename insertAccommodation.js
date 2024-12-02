require('dotenv').config();
const mongoose = require('mongoose');
const Accommodation = require('./models/Accommodation');  // Make sure the path is correct

// Define your accommodation data
const accommodationData = {
  Cairo: [
    { type: 'single', price: 100 },
    { type: 'double', price: 180 },
    { type: 'family', price: 250 },
  ],
  Giza: [
    { type: 'single', price: 90 },
    { type: 'double', price: 160 },
    { type: 'family', price: 230 },
  ],
  Alexandria: [
    { type: 'single', price: 80 },
    { type: 'double', price: 150 },
    { type: 'family', price: 220 },
  ],
  Luxor: [
    { type: 'single', price: 120 },
    { type: 'double', price: 200 },
    { type: 'family', price: 280 },
  ],
  Aswan: [
    { type: 'single', price: 70 },
    { type: 'double', price: 130 },
    { type: 'family', price: 190 },
  ],
};

// Function to insert accommodation data into MongoDB
async function insertAccommodation() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected successfully');

    // Loop through each city and insert accommodation data
    for (const city in accommodationData) {
      const accommodations = accommodationData[city];
      for (const accommodation of accommodations) {
        const newAccommodation = new Accommodation({
          location: city,
          type: accommodation.type,
          price: accommodation.price,
        });
        await newAccommodation.save();
      }
    }

    console.log('Accommodation data inserted successfully');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error inserting accommodation data:', error);
    mongoose.disconnect();
  }
}

// Run the insert function
insertAccommodation();
