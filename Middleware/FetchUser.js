const jwt = require('jsonwebtoken'); // Importing the jsonwebtoken library
require('dotenv').config(); // Loading environment variables
const secret = process.env.JWT_SECRET; // Getting the JWT secret from environment variables

// Middleware function to fetch user from JWT token
const fetchUser = (req, res, next) => {
    // Taking the token from the request header
    const token = req.header('auth-token');
    
    // Checking if token exists
    if (!token) {
        // Sending error response if token is missing
        res.status(401).send({ error: "PLEASE AUTHENTICATE USING A VALID TOKEN" });
    }
    try {
        // Verifying the token with the secret
        const data = jwt.verify(token, secret);
        console.log(data);
        // Adding user ID to the request object
        req.userId = data._id;
        next(); // Calling the next middleware
    } catch (error) {
        // Sending error response if token verification fails
        res.status(401).send({ error: "PLEASE AUTHENTICATE USING A VALID TOKEN" });
    }
};

// Exporting the middleware function
module.exports = fetchUser;
