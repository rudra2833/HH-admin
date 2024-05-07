// require('dotenv').config({path: './env'});
// use to share .env file to all the files during the run
// for using import u have to go in jason->scripts and add "-r dotenv/config<THIS WILL ALSO LOAD .ENV FILE AT RUN> --experimental-json-modules"
// i.e. "nodemon src/index.js" to the above
import dotenv from "dotenv"
dotenv.config({path:"./env"});


import mongoose from "mongoose";
//importing the database name which we want to create from constant.js
import { DB_NAME } from "./constant.js";

//importing the mongodb connection constant variable from db
import connectDB from "./db/db_index.js";

import { app } from "./app.js";




// +++++ADMIN-SERVICE-PROVIDER-ADD+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
import { spadd } from "./controllers/spadd.controller.js"

app.get("/admin/spadd",(req,res)=>{
    res.render("spadd.ejs");
})

app.post("/admin/spadd/submit",spadd)





//calling the function 
connectDB()
.then(() => {
    //it is just server port listing code
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running at port: ${process.env.PORT}`)
    })

}).catch((err) => {
    console.log("MongoDB Connection function call error")
});


