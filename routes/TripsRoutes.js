const express = require('express'); // Importing the express library
const router = express.Router(); // Creating an instance of express router

// Importing controller functions for handling trips routes
const { addTrip, trips, tripsParameter, tripByDate } = require('../Controllers/tripsController');

// Route for adding a new trip
router.route('/trips/new').post(addTrip);

// Route for retrieving trips and applying parameters
router.route('/trips').get(trips, tripsParameter);

// Route for retrieving trips by date
router.route('/tripByDate').get(tripByDate);

// Route for applying parameters to trips
router.route('/parameter').get(tripsParameter);

module.exports = router; // Exporting the router instance for use in other files
