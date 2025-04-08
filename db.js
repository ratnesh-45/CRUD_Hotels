const mongoose = require("mongoose");
require('dotenv').config();

//define the mongoUrl
//const MongodbURL = process.env.MONGODB_URL_LOCAL;
const MongodbURL = process.env.MONGODB_URL;

mongoose.connect(MongodbURL);


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