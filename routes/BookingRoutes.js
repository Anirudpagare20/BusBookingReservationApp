const express = require("express"); // Importing the express library

const router = express.Router(); // Creating an instance of express router

// Importing controller functions for handling booking routes
const { addBooking, bookings } = require('../Controllers/BookingController');

// Route for creating a new booking
router.route('/booking/new').post(addBooking);

// Route for retrieving all bookings
router.route('/bookings').get(bookings);

module.exports = router; // Exporting the router instance for use in other files

