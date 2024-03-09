const express = require('express');
const app = express();
const bookingControllers = require('./controllers/BookingControllers'); // Importing booking controller
const userControllers = require('./controllers/userControllers'); // Importing user controller
const fetchUser = require('./middleware/fetchuser'); // Importing middleware for fetching user
const BusData = require('../Data/BusData'); // Importing bus data

app.use(express.json()); // Parsing JSON bodies
app.use(express.urlencoded({ extended: false })); // Parsing URL-encoded bodies

const router = express.Router(); // Creating a router instance

//************* Bus Info ******************

router.get('/bus-info', (req, res) => {
    res.status(200).json({ BusData }); // Endpoint to get bus information
});

//************ User requests *********************

router.post('/user/signup', userControllers.userValidationRules, userControllers.addNewUser); // Endpoint for user signup

router.post('/user/login', userControllers.userLoginRules, userControllers.login); // Endpoint for user login

router.post('/get-user', fetchUser, userControllers.getUser); // Endpoint to get user details

//************ Bookings requests *********************

router.get('/bookings/get', bookingControllers.bookings); // Endpoint to get all bookings

router.get('/bookings/date/:date', bookingControllers.bookingsByDate); // Endpoint to get bookings by date

router.get('/bookings/search', bookingControllers.bookingParameter); // Endpoint to search bookings with parameters

router.post('/bookings/new',
    // fetchUser, // Uncomment this line if you want to fetch user before adding booking
    bookingControllers.bookingValidationRules, // Applying validation rules for adding a booking
    bookingControllers.addBooking // Endpoint to add a new booking
);

app.use('/api/v1', router); // Mounting the router at /api/v1 base path

module.exports = app; // Exporting the Express app
