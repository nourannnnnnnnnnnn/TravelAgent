require('dotenv').config(); // Load environment variables
const mongoose = require('mongoose');
const Transportation = require('./models/Transportation'); // Ensure the path is correct

async function run() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Database connected successfully');

    // Transportation data to insert or update
    const transportationData = [
      { 
        location: 'Cairo', 
        type: 'Bus', 
        details: 'Citywide bus service', 
        basePrice: 100, 
        rushHourStart: '08:00', 
        rushHourEnd: '10:00', 
        rushHourMultiplier: 1.5 
      },
      { 
        location: 'Cairo', 
        type: 'Taxi', 
        details: '24/7 taxi service', 
        basePrice: 250, 
        rushHourStart: '08:00', 
        rushHourEnd: '10:00', 
        rushHourMultiplier: 1.5 
      },
      { 
        location: 'Giza', 
        type: 'Camel Ride', 
        details: 'Camel rides near the pyramids', 
        basePrice: 150, 
        rushHourStart: '07:00', 
        rushHourEnd: '09:00', 
        rushHourMultiplier: 1.2 
      }
    ];

    // Loop through each transportation entry and update or insert it
    for (let data of transportationData) {
      try {
        // Check if the transportation already exists
        const existingTransport = await Transportation.findOne({
          location: data.location,
          type: data.type
        });

        if (existingTransport) {
          // If exists, update the document
          existingTransport.details = data.details;
          existingTransport.basePrice = data.basePrice;
          existingTransport.rushHourStart = data.rushHourStart;
          existingTransport.rushHourEnd = data.rushHourEnd;
          existingTransport.rushHourMultiplier = data.rushHourMultiplier;

          // Save the updated document
          await existingTransport.save();
          console.log(`Updated transportation: ${data.type} in ${data.location}`);
        } else {
          // If doesn't exist, create a new document
          const newTransportation = new Transportation(data);
          await newTransportation.save();
          console.log(`Inserted new transportation: ${data.type} in ${data.location}`);
        }
      } catch (error) {
        console.error('Error updating/inserting transportation:', error.message);
      }
    }

    mongoose.connection.close(); // Close the connection after all operations are completed

  } catch (error) {
    console.log('Error connecting to the database:', error.message);
  }
}

// Run the script
run();
