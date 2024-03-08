const mongoose = require("mongoose");

//creating the database with ConnectDB

const ConnectDB = async () => {
    try {
        const URL = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/'
          await mongoose.connect(URL, {
             useUnifiedTopology: true,
             useNewUrlParser: true,
          })
        console.log(" Database Connected Successfully")
    } catch (error) {
            console.log(`Error: ${error.message}`)
    }
}

//exporting the ConnectDB
module.exports = ConnectDB;