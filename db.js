const mongoose = require("mongoose");

//define the mongoUrl
const mongoUrl = "mongodb://localhost:27017/hotels";

mongoose.connect(mongoUrl);


const db=mongoose.connection;

db.on("connected",()=>{
  console.log("Mongodb Server Connected");
})
db.on("error",(err)=>{
  console.error("Mongodb Connection Error",err);
})
db.on("disconnected",()=>{
  console.log("Mongodb Server Disconnected");
})

 module.exports=db;