//This will be the startin file of the project

const express = require("express")

const mongoose = require("mongoose")

const app = express()


const server_config = require("./configs/server.config")

const db_config = require("./configs/db.config")

const user_model = require("./models/user.model") 

const bcrypt = require("bcryptjs")
// Create an admin user at the starting of the application
//If not already present

//Connection with mongodB
mongoose.connect(db_config.DB_URL)
// To staet a server
const db = mongoose.connection

db.on = ("error" , ()=>{
  console.log("Error while connecting to the mongoDb");
})

db.once("open" , ()=>{
  console.log("Connected to the dB")
 init()
} )
async function init() {
  let user = await user_model.findOne({userId : "admin"})

  if(user){
    console.log("Admin is already present");
    return
  }
  try{
   user = await user_model.create( {
    name: "Swalehaa",
    userId: "admin",
    email : "swalehakhan@gmailcom",
    userType : "ADMIN",
    password : bcrypt.hashSync("Welcome1" , 8)
   })
   console.log("Admin created " , user);
  }
  catch(err){
 console.log("Eroor wile creating admin" , err);
  }
}
app.listen(server_config.PORT, ()=>{
  console.log("Server Started at port num:" , server_config.PORT);
})
//port no. 808 is cutomizable we can change it
