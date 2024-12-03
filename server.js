require('dotenv').config(); // Ensure this is at the very top

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Import routes
const allInOneRoutes = require('./routes/allInOneRoutes');
const customizableRoutes = require('./routes/customizableRoutes');
const locationRoutes = require('./routes/locationRoutes');  // Updated location routes
const tripRoutes = require('./routes/tripRoutes');
const accommodationRoutes = require('./routes/accommodationRoutes');
const transportationRoutes = require('./routes/transportation');

// Initialize express app
const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse incoming request bodies as JSON
app.use(bodyParser.json());

// Database connection using Mongoose
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected successfully'))
  .catch(err => {
    console.log('Database connection failed:', err.message);
    process.exit(1); // Exit process if DB connection fails
  });

// Register API routes
app.use('/api/transportation', transportationRoutes);  // Use the transportation route
app.use('/api/allInOne', allInOneRoutes);  // All in one routes
app.use('/api/customize', customizableRoutes);  // Customizable routes
app.use('/api/locations', locationRoutes);  // Locations routes
app.use('/api/trips', tripRoutes);  // Trip routes
app.use('/api/accommodations', accommodationRoutes);  // Accommodation routes

// Start server and listen on the defined port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
