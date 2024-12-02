// customizableRoutes.js
const express = require('express');
const router = express.Router();
const { customizeTrip } = require('../controllers/customizableController');

router.post('/customize', customizeTrip);

module.exports = router;
