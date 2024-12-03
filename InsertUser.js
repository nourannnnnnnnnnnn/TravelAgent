require('dotenv').config(); // Ensure you have your MongoDB URI in a .env file
const mongoose = require('mongoose');
const User = require('./models/User');  // Adjust the path to match your directory structure
const bcrypt = require('bcryptjs');  // To hash passwords

// Sample user data
const usersData = [
  { name: 'Nouran', username: 'nouran', email: 'nouran@gmail.com', password: 'password123' },
  { name: 'Manar', username: 'manar', email: 'manar@gmail.com', password: 'password456' },
  { name: 'Rawan', username: 'rawan', email: 'rawan@gmail.com', password: 'password789' }
];

// Connect to MongoDB and insert data
async function insertUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Database connected successfully');

    // Hash passwords before saving
    const usersWithHashedPasswords = await Promise.all(usersData.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return {
        ...user,
        password: hashedPassword  // Replace the plain password with the hashed one
      };
    }));

    // Insert users data
    await User.insertMany(usersWithHashedPasswords);
    console.log('User data inserted successfully');

    mongoose.disconnect();
  } catch (error) {
    console.error('Error inserting data:', error);
    mongoose.disconnect();
  }
}

insertUsers();
