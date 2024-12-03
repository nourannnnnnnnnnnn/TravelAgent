require('dotenv').config();
const mongoose = require('mongoose');
const Transportation = require('./models/Transportation'); // Your model for Transportation

// Sample data to insert into the Transportation collection
const transportationData = [
  { 
    location: 'Giza', 
    type: 'Camel Ride', 
    details: 'Camel rides near the pyramids', 
    price: 150, 
    rushHourStart: '07:00',  // Store as string
    rushHourEnd: '09:00',    // Store as string
    rushHourMultiplier: 1.2,  
    basePrice: 150,  
    flatRate: false,  
  },
  { 
    location: 'Cairo', 
    type: 'Bus Tour', 
    details: 'City bus tour', 
    price: 100, 
    rushHourStart: '08:00',  // Store as string
    rushHourEnd: '10:00',    // Store as string
    rushHourMultiplier: 1.1,  
    basePrice: 100,  
    flatRate: true,  
  },
  { 
    location: 'Luxor', 
    type: 'Hot Air Balloon Ride', 
    details: 'Hot air balloon ride over Luxor', 
    price: 250, 
    rushHourStart: '05:00',  // Store as string
    rushHourEnd: '07:00',    // Store as string
    rushHourMultiplier: 1.3,  
    basePrice: 250,  
    flatRate: false,  
  }
];

// Connect to MongoDB and insert data into the Transportation collection
async function insertTransportation() {
  try {
    // Get the MongoDB URI from the .env file or use default
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/myDatabase';

    // Connect to MongoDB
    await mongoose.connect(mongoURI, { 
      useUnifiedTopology: true  // Remove deprecated useNewUrlParser and useUnifiedTopology
    });
    console.log('Database connected successfully');

    // Insert multiple transportation data into the collection
    await Transportation.insertMany(transportationData);
    console.log('Transportation data inserted successfully');
    
    // Disconnect after insertion
    mongoose.disconnect();
  } catch (error) {
    console.error('Error inserting data:', error);
    mongoose.disconnect();
  }
}

// Call the insertTransportation function
insertTransportation();
