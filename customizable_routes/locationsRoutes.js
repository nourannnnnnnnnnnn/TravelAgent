const express = require('express');
const router = express.Router();

// Dummy data for locations (You can replace this with data from MongoDB)
const locations = ["Cairo", "Paris", "London", "New York"];

// GET all locations
router.get('/', (req, res) => {
  res.json(locations);
});

module.exports = router;
