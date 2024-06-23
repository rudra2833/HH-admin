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



// +++++ADMIN-DASHBOARD+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.get("/admin",(req,res)=>{
    res.render("admin_dashboard.ejs");
});










// +++++ADMIN-SP-DATA+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
import { spdataDownload, spsearch } from "./controllers/spdata.controller.js";
import { spdataupdate } from "./controllers/spdata.controller.js";
import { upload } from './middlewares/multer.middleware.js'

app.get("/admin/spdata",(req,res)=>{
    res.render("admin_spdata.ejs");   
})

//before checking u need to add data to the sp database TELL TEJ
app.post("/admin/spdata/search",spsearch);

//for updating the sp data
app.post("/admin/spdata/update",upload.fields([
    {
    name: "avatar",
    maxCount: 1
    },
]),spdataupdate);

//to download the csv file
app.get("/admin/spdata/download",spdataDownload);









// +++++ADMIN-NEW-REQUEST+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
import { sprequest, updateRequest ,requestDownload } from "./controllers/sprequest.controller.js";

//open the page
app.get("/admin/newrequest", sprequest);

// to update the request
app.post("/admin/updateRequest", updateRequest);

// Route to handle the CSV download
app.get('/admin/newrequest/download',requestDownload);








// +++++ADMIN-CUSTOMER-FEEDBACK-+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
import { customerfeedback, feedbackDownload } from "./controllers/customerfeedback.controller.js";
import {Feedback} from './models/feedback.model.js'

//open the page
app.get("/admin/customerfeedback",customerfeedback);

// Route to handle the CSV download
app.get('/admin/customerfeedback/download',feedbackDownload);








// +++++ADMIN-SERVICE-PROVIDER-ADD+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
import { spadd } from "./controllers/spadd.controller.js"
// import {upload} from './middlewares/multer.middleware.js'

app.get("/admin/spadd",(req,res)=>{
    res.render("spadd.ejs");
});

app.post("/admin/spadd/submit",upload.fields([
    {
    name: "avatar",
    maxCount: 1
    },
]),spadd);








// +++++ADMIN-SERVER++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

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


