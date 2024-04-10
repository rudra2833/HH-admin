// // all import statements
// import express from "express";
// import bodyParser from "body-parser";


// // default constants for whole project
// const port = 3000;
// const app = express();

// // basic middlewares to use
// app.use(bodyParser.urlencoded({extended:true}));
// app.use(express.static("public"));

// //scripts to add in the pages


// // for GETing the HOME page
// app.get("/",(req,res)=>{
//     res.render("navbar/home.ejs");
// })

// app.get("/contactus",(req,res)=>{
//     res.render("navbar/contactus.ejs");
// })

// app.get("/aboutus",(req,res)=>{
//     res.render("navbar/aboutus.ejs");
// })

// app.get("/Joinus",(req,res)=>{
//     res.render("forms_page/spform.ejs");
// })

// app.get("/feedback",(req,res)=>{
//     res.render("navbar/feedback.ejs");
// })

// app.get("/login",(req,res)=>{
//     res.render("forms_page/log-reg.ejs");
// })



// // port listening
// app.listen(port,()=>{
//     console.log(`Listening at port: ${port}`);
// })