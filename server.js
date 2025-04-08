// Import required modules
const express = require("express");
const app = express();
const db = require("./db"); // Database connection



// Middleware to parse JSON request bodies
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// Root route - Welcome message
app.get("/", (req, res) => {
  res.send("This is hotel.. plz gives the order.");
});

const personRoute=require("./routes/personRoutes")
app.use('/person',personRoute)

const menuRoute=require("./routes/menuRoutes")
app.use('/menu',menuRoute)



// Start the server and listen on port 3000
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
