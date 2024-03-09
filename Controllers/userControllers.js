const userMod = require('../Models/userMod'); // Importing the user model
const bcrypt = require('bcryptjs'); // Importing bcrypt for password hashing
const jwt = require('jsonwebtoken'); // Importing jsonwebtoken for generating tokens
require('dotenv').config(); // Loading environment variables

const { body, validationResult } = require('express-validator'); // Importing express-validator for request validation

// Function to generate authentication token
const generateAuthToken = (user) => {
    console.log(process.env.JWT_SECRET); // Logging JWT secret key (for debugging)
    console.log(user._id, "HI"); // Logging user ID (for debugging)
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET); // Generating token with user ID and JWT secret
    return token;
};

// Controller function to add a new user
exports.addNewUser = async (req, res) => {
    try {
        const errors = validationResult(req); // Checking for validation errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }); // Returning validation errors if any
        }

        let user = await userMod.findOne({ email: req.body.email }); // Checking if user with email already exists
        if (user) {
            return res.status(400).json({ error: "Sorry, a user with this email already exists" }); // Returning error if user already exists
        }

        const salt = await bcrypt.genSalt(10); // Generating salt for password hashing
        const securePass = await bcrypt.hash(req.body.password, salt); // Hashing the password
        req.body.password = securePass; // Assigning hashed password to request body

        const newUser = await userMod.create(req.body); // Creating a new user
        const token = generateAuthToken(newUser); // Generating authentication token for the new user
        res.status(201).json({ success: true, token }); // Sending success response with token
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handling internal server error
    }
};

// Controller function for user login
exports.login = async (req, res) => {
    try {
        const errors = validationResult(req); // Checking for validation errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }); // Returning validation errors if any
        }

        const { email, password } = req.body; // Extracting email and password from request body

        // Checking if the user with the given email exists
        const user = await userMod.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' }); // Returning error if user not found
        }

        // Comparing the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' }); // Returning error if password is invalid
        }

        // Generating and returning an authentication token
        const token = generateAuthToken(user);
        res.status(200).json({ success: true, token }); // Sending success response with token
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handling internal server error
    }
};

// Controller function to get user details
exports.getUser = async (req, res) => {
    try {
        const userId = req.userId; // Getting user ID from request (assuming it's set during authentication middleware)
        const user = await userMod.findById(userId); // Fetching user from database using user ID
        if (!user) {
            return res.status(404).json({ message: 'User not found' }); // Returning error if user not found
        }
        res.status(200).json({ success: true, user }); // Sending success response with user details
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handling internal server error
    }
};

// Validation rules for user login
exports.userLoginRules = [
    body('email').isEmail(),
    body('password').exists()
];

// Validation rules for user registration
exports.userValidationRules = [
    // Validation rules for various fields in the user schema
    // Each rule specifies constraints or conditions for the field
    // Express-validator is used for request validation
];
