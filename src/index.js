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





// for GETing the HOME page
app.get("/",(req,res)=>{
    res.render("navbar/home.ejs");
})

app.get("/contactus",(req,res)=>{
    res.render("navbar/contactus.ejs");
})

app.get("/aboutus",(req,res)=>{
    res.render("navbar/aboutus.ejs");
})

app.get("/Joinus",(req,res)=>{
    res.render("forms_page/spform.ejs");
})

app.get("/feedback",(req,res)=>{
    res.render("navbar/feedback.ejs");
})

app.get("/login",(req,res)=>{
    res.render("forms_page/log-reg.ejs");
})




// for search with ejs
app.get("/search",(req,res)=>{
    res.render("searchpage.ejs");
})

// app.post("/search", (req, res) => {
//     const city = req.body.choice;
//     const service = req.body.service;

//     //use of backend here BELOW

//     res.render("searchpage.ejs",{ 
//         db: song,
//     });
// });









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


