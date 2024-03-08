const express = require('express');
const app = express();



app.use(express.json());
app.use( express.urlencoded({ extended: false }));


const router = express.Router();

// BUS INFO 
 router.get('/bus-info', (req, res) => {
    res.status(200).json({BusData})
 });


 
 
 
 
 
 
 
 
 
 app.use('/api/v1', router);

 //Exporting The Modules 
 module.exports = app;