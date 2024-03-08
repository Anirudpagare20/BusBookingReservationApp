const app = require ("./app");
const dotenv = require ("dotenv");
const ConnectDB = require("./Configuration/ConnectDB");


// create the server 
const port = process.env.PORT || 5000;

// dotenv configuration 
dotenv.config();

//connecting the database 
ConnectDB()

//listening on port 
app.listen(port, () => {
    console.log(`server listening on ${port}`)
});