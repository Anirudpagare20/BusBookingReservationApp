const BookingMod = require('../Models/BookingMod'); // Importing BookingMod model
const { body, validationResult } = require('express-validator'); // Importing express-validator for request validation

// API for adding trips
exports.addBooking = async (req, res) => {
    try {
        const errors = validationResult(req); // Checking for validation errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }); // Returning validation errors if any
        }

        const newBooking = await BookingMod.create(req.body); // Creating a new booking using the request body
        res.status(201).json({ success: true, newBooking }); // Sending success response with the newly created booking
    } catch (error) {
        res.status(500).json({ message: error }); // Handling internal server error
    }
}

// GET API for retrieving all trips
exports.bookings = async (req, res) => {
    try {
        const Bookings = await BookingMod.find({}); // Retrieving all bookings from the database
        res.status(200).json({ success: true, Bookings }); // Sending success response with all bookings
    } catch (error) {
        res.status(500).json({ message: error }); // Handling internal server error
    }
}

// GET API for retrieving bookings by date
exports.bookingsByDate = async (req, res) => {
    try {
        const { date } = req.params; // Extracting date from request parameters
        const [year, month, day] = date.split('-'); // Splitting date into year, month, and day
        const bookingsByDate = await BookingMod.find({ date: `${year}-${month}-${day}` }); // Retrieving bookings by date
        res.status(200).json({ success: true, bookingsByDate }); // Sending success response with bookings by date
    } catch (error) {
        res.status(500).json({ message: error }); // Handling internal server error
    }
}

// GET API for retrieving trips based on query parameters
exports.bookingParameter = async (req, res) => {
    try {
        const filter = {};
        for (const key in req.query) {
            filter[key] = req.query[key]; // Constructing filter object from query parameters
        }
        const trips = await BookingMod.find(filter); // Retrieving trips based on filter
        res.status(200).json({ success: true, trips }); // Sending success response with filtered trips
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handling internal server error
    }
}

// Validation rules for the booking schema
exports.bookingValidationRules = [
    // Validation rules for various fields in the booking schema
    // Each rule specifies constraints or conditions for the field
    // Express-validator is used for request validation
    body('date').isISO8601().withMessage('Invalid date format'), // Assuming you want the date in ISO8601 format (e.g., 'YYYY-MM-DD')
    body('time').notEmpty().withMessage('Time is required'),
    body('from').notEmpty().withMessage('From location is required'),
    body('to').notEmpty().withMessage('To location is required'),
    body('busOwnerID').isInt().withMessage('Invalid bus owner ID'),
    body('startTime').isInt().withMessage('Invalid start time'),
    body('EndTime').isInt().withMessage('Invalid end time'),
    body('category').notEmpty().withMessage('Category is required'),
    body('SeatBooked').isArray().notEmpty().withMessage('Seat bookings are required'),
    body('bus_no').notEmpty().withMessage('Bus number is required'),
    body('amenities_list').isArray().notEmpty().withMessage('Amenities list is required'),
    body('busFare').isFloat().withMessage('Invalid bus fare'),
    body('busName').notEmpty().withMessage('Bus name is required'),
    body('name').notEmpty().withMessage('Name is required'),
    body('gender').notEmpty().withMessage('Gender is required'),
    body('age').isInt().withMessage('Invalid age'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('mobileNo').notEmpty().withMessage('Mobile number is required'),
    body('seatNumber').isInt().withMessage('Invalid seat number'),
];
