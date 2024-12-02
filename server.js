require('dotenv').config();  // This should be at the very top 

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Import routes
const allInOneRoutes = require('./routes/allInOneRoutes');
const customizableRoutes = require('./routes/customizableRoutes');
const locationRoutes = require('./routes/locationRoutes');
const tripRoutes = require('./routes/tripRoutes');  // Correct path to your trip routes
const accommodationRoutes = require('./routes/accommodationRoutes'); // Added accommodation routes

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.log(err));

// Routes
app.use('/api/allInOne', allInOneRoutes);
app.use('/api/customize', customizableRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/trips', tripRoutes);  // Added trip routes here
app.use('/api/accommodations', accommodationRoutes);  // Added accommodation routes
const transportationRoutes = require('./routes/transportationRoutes'); // Correct path
app.use('/api/transportation', transportationRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
