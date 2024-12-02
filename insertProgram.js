require('dotenv').config();
const mongoose = require('mongoose');
const Program = require('./models/program');  // Adjust the path to match your directory structure

// Data to insert into the Program collection
const programsData = [
  { location: 'Cairo', program: 'City Tour', description: 'A guided tour around Cairo city.' },
  { location: 'Cairo', program: 'Pyramids Visit', description: 'Visit the famous pyramids of Giza.' },
  { location: 'Giza', program: 'Pyramids Visit', description: 'Visit the famous pyramids of Giza.' },
  { location: 'Giza', program: 'Sphinx Tour', description: 'Explore the Great Sphinx of Giza.' },
  { location: 'Alexandria', program: 'Beach Vacation', description: 'Relax on the beautiful beaches of Alexandria.' },
  { location: 'Luxor', program: 'Valley of the Kings Tour', description: 'Tour the famous Valley of the Kings.' },
  { location: 'Aswan', program: 'Philae Temple Visit', description: 'Explore the Philae Temple in Aswan.' }
];

// Connect to MongoDB and insert data
async function insertPrograms() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Database connected successfully');

    await Program.insertMany(programsData);
    console.log('Program data inserted successfully');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error inserting data:', error);
    mongoose.disconnect();
  }
}

insertPrograms();
