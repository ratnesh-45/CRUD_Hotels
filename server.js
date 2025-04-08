// Import required modules
const express = require("express");
const app = express();
const db = require("./db"); // Database connection
require('dotenv').config();

const PORT=process.env.PORT || 3000;



// Middleware to parse JSON request bodies
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// Root route - Welcome message
app.get("/", (req, res) => {
  res.send("This is hotel.. plz gives the order.");
});

//import person route in server file
const personRoute=require("./routes/personRoutes")
app.use('/person',personRoute)

const menuRoute=require("./routes/menuRoutes")
app.use('/menu',menuRoute)



// Start the server and listen on port 3000
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
