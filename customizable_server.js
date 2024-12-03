/*const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const Accommodation = require('./customizable_models/Accommodation'); // Accommodation model
const CustomizableTrip = require('./customizable_models/CustomizableTrip'); // CustomizableTrip model

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// ------------------- Accommodation Routes ------------------- //

// GET all accommodations
app.get('/api/accommodations', async (req, res) => {
    try {
        const accommodations = await Accommodation.find();
        if (accommodations.length === 0) {
            return res.status(404).json({ message: 'No accommodations found' });
        }
        res.json(accommodations);
    } catch (err) {
        console.error('Error fetching accommodations:', err);
        res.status(500).json({ message: 'Error fetching accommodations' });
    }
});

// GET accommodations by location
app.get('/api/accommodations/:location', async (req, res) => {
    const location = req.params.location;
    try {
        const accommodations = await Accommodation.find({ location });
        if (accommodations.length === 0) {
            return res.status(404).json({ message: `No accommodations found in ${location}` });
        }
        res.json(accommodations);
    } catch (err) {
        console.error('Error fetching accommodations:', err);
        res.status(500).json({ message: 'Error fetching accommodations' });
    }
});

// POST a new accommodation
app.post('/api/accommodations', async (req, res) => {
    const { name, location, price } = req.body;
    const newAccommodation = new Accommodation({ name, location, price });

    try {
        const savedAccommodation = await newAccommodation.save();
        res.status(201).json(savedAccommodation);
    } catch (err) {
        console.error('Error saving accommodation:', err);
        res.status(500).json({ message: 'Error saving accommodation' });
    }
});

// PUT update accommodation by ID
app.put('/api/accommodations/:id', async (req, res) => {
    const { id } = req.params;
    const { name, location, price } = req.body;

    try {
        const updatedAccommodation = await Accommodation.findByIdAndUpdate(id, { name, location, price }, { new: true });
        if (!updatedAccommodation) {
            return res.status(404).json({ message: 'Accommodation not found' });
        }
        res.json(updatedAccommodation);
    } catch (err) {
        console.error('Error updating accommodation:', err);
        res.status(500).json({ message: 'Error updating accommodation' });
    }
});

// DELETE accommodation by ID
app.delete('/api/accommodations/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedAccommodation = await Accommodation.findByIdAndDelete(id);
        if (!deletedAccommodation) {
            return res.status(404).json({ message: 'Accommodation not found' });
        }
        res.json({ message: 'Accommodation deleted successfully' });
    } catch (err) {
        console.error('Error deleting accommodation:', err);
        res.status(500).json({ message: 'Error deleting accommodation' });
    }
});

// ------------------- CustomizableTrip Routes ------------------- //

// GET all customizable trips
app.get('/api/customizable-trips', async (req, res) => {
    try {
        const trips = await CustomizableTrip.find();
        if (trips.length === 0) {
            return res.status(404).json({ message: 'No customizable trips found' });
        }
        res.json(trips);
    } catch (err) {
        console.error('Error fetching customizable trips:', err);
        res.status(500).json({ message: 'Error fetching customizable trips' });
    }
});

// GET customizable trip by ID
app.get('/api/customizable-trips/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const trip = await CustomizableTrip.findById(id);
        if (!trip) {
            return res.status(404).json({ message: 'Customizable trip not found' });
        }
        res.json(trip);
    } catch (err) {
        console.error('Error fetching customizable trip:', err);
        res.status(500).json({ message: 'Error fetching customizable trip' });
    }
});

// POST a new customizable trip
app.post('/api/customizable-trips', async (req, res) => {
    const { name, description, location, activities } = req.body;
    const newTrip = new CustomizableTrip({ name, description, location, activities });

    try {
        const savedTrip = await newTrip.save();
        res.status(201).json(savedTrip);
    } catch (err) {
        console.error('Error saving customizable trip:', err);
        res.status(500).json({ message: 'Error saving customizable trip' });
    }
});

// PUT update customizable trip by ID
app.put('/api/customizable-trips/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, location, activities } = req.body;

    try {
        const updatedTrip = await CustomizableTrip.findByIdAndUpdate(id, { name, description, location, activities }, { new: true });
        if (!updatedTrip) {
            return res.status(404).json({ message: 'Customizable trip not found' });
        }
        res.json(updatedTrip);
    } catch (err) {
        console.error('Error updating customizable trip:', err);
        res.status(500).json({ message: 'Error updating customizable trip' });
    }
});

// DELETE customizable trip by ID
app.delete('/api/customizable-trips/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTrip = await CustomizableTrip.findByIdAndDelete(id);
        if (!deletedTrip) {
            return res.status(404).json({ message: 'Customizable trip not found' });
        }
        res.json({ message: 'Customizable trip deleted successfully' });
    } catch (err) {
        console.error('Error deleting customizable trip:', err);
        res.status(500).json({ message: 'Error deleting customizable trip' });
    }
});

// ------------------- MongoDB Connection and Server ------------------- //

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected successfully');
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });


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
*/


require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Import routes
const allInOneRoutes = require('./routes/allInOneRoutes');
const customizableRoutes = require('./routes/customizableRoutes');
const locationRoutes = require('./routes/locationRoutes');
const tripRoutes = require('./routes/tripRoutes');
const accommodationRoutes = require('./routes/accommodationRoutes');
const transportation = require('./routes/transportation'); // Correct file name
const CustomizableTrip = require('./models/CustomizableTrip');
const Accommodation = require('./models/Accommodation');


// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse incoming request bodies as JSON
app.use(bodyParser.json());

// Database connection using Mongoose
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Database connected successfully'))
  .catch((err) => {
    console.error('Database connection failed:', err.message);
    process.exit(1); // Exit process if DB connection fails
  });

// Register API routes
app.use('/api/transportation', transportation);
app.use('/api/allInOne', allInOneRoutes);
app.use('/api/customize', customizableRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/accommodations', accommodationRoutes);

// ------------------- Accommodation Routes ------------------- //

// GET all accommodations
app.get('/api/accommodations', async (req, res) => {
    try {
        const accommodations = await Accommodation.find();
        if (accommodations.length === 0) {
            return res.status(404).json({ message: 'No accommodations found' });
        }
        res.json(accommodations);
    } catch (err) {
        console.error('Error fetching accommodations:', err);
        res.status(500).json({ message: 'Error fetching accommodations' });
    }
});

// GET accommodations by location
app.get('/api/accommodations/:location', async (req, res) => {
    const location = req.params.location;
    try {
        const accommodations = await Accommodation.find({ location });
        if (accommodations.length === 0) {
            return res.status(404).json({ message: `No accommodations found in ${location}` });
        }
        res.json(accommodations);
    } catch (err) {
        console.error('Error fetching accommodations:', err);
        res.status(500).json({ message: 'Error fetching accommodations' });
    }
});

// POST a new accommodation
app.post('/api/accommodations', async (req, res) => {
    const { name, location, price } = req.body;
    const newAccommodation = new Accommodation({ name, location, price });

    try {
        const savedAccommodation = await newAccommodation.save();
        res.status(201).json(savedAccommodation);
    } catch (err) {
        console.error('Error saving accommodation:', err);
        res.status(500).json({ message: 'Error saving accommodation' });
    }
});

// PUT update accommodation by ID
app.put('/api/accommodations/:id', async (req, res) => {
    const { id } = req.params;
    const { name, location, price } = req.body;

    try {
        const updatedAccommodation = await Accommodation.findByIdAndUpdate(id, { name, location, price }, { new: true });
        if (!updatedAccommodation) {
            return res.status(404).json({ message: 'Accommodation not found' });
        }
        res.json(updatedAccommodation);
    } catch (err) {
        console.error('Error updating accommodation:', err);
        res.status(500).json({ message: 'Error updating accommodation' });
    }
});

// DELETE accommodation by ID
app.delete('/api/accommodations/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedAccommodation = await Accommodation.findByIdAndDelete(id);
        if (!deletedAccommodation) {
            return res.status(404).json({ message: 'Accommodation not found' });
        }
        res.json({ message: 'Accommodation deleted successfully' });
    } catch (err) {
        console.error('Error deleting accommodation:', err);
        res.status(500).json({ message: 'Error deleting accommodation' });
    }
});

// ------------------- CustomizableTrip Routes ------------------- //

// GET all customizable trips
app.get('/api/customizable-trips', async (req, res) => {
    try {
        const trips = await CustomizableTrip.find();
        if (trips.length === 0) {
            return res.status(404).json({ message: 'No customizable trips found' });
        }
        res.json(trips);
    } catch (err) {
        console.error('Error fetching customizable trips:', err);
        res.status(500).json({ message: 'Error fetching customizable trips' });
    }
});

// GET customizable trip by ID
app.get('/api/customizable-trips/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const trip = await CustomizableTrip.findById(id);
        if (!trip) {
            return res.status(404).json({ message: 'Customizable trip not found' });
        }
        res.json(trip);
    } catch (err) {
        console.error('Error fetching customizable trip:', err);
        res.status(500).json({ message: 'Error fetching customizable trip' });
    }
});

// POST a new customizable trip
app.post('/api/customizable-trips', async (req, res) => {
    const { name, description, location, activities } = req.body;
    const newTrip = new CustomizableTrip({ name, description, location, activities });

    try {
        const savedTrip = await newTrip.save();
        res.status(201).json(savedTrip);
    } catch (err) {
        console.error('Error saving customizable trip:', err);
        res.status(500).json({ message: 'Error saving customizable trip' });
    }
});

// PUT update customizable trip by ID
app.put('/api/customizable-trips/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, location, activities } = req.body;

    try {
        const updatedTrip = await CustomizableTrip.findByIdAndUpdate(id, { name, description, location, activities }, { new: true });
        if (!updatedTrip) {
            return res.status(404).json({ message: 'Customizable trip not found' });
        }
        res.json(updatedTrip);
    } catch (err) {
        console.error('Error updating customizable trip:', err);
        res.status(500).json({ message: 'Error updating customizable trip' });
    }
});

// DELETE customizable trip by ID
app.delete('/api/customizable-trips/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTrip = await CustomizableTrip.findByIdAndDelete(id);
        if (!deletedTrip) {
            return res.status(404).json({ message: 'Customizable trip not found' });
        }
        res.json({ message: 'Customizable trip deleted successfully' });
    } catch (err) {
        console.error('Error deleting customizable trip:', err);
        res.status(500).json({ message: 'Error deleting customizable trip' });
    }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
