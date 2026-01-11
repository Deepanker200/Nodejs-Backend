const express = require("express");
const { adminAuth } = require("./middlewares/auth");
const { dummyMiddleware } = require("./middlewares/dummyMiddleware");

const app = express();        //Calling the function

// app.use("/user",(req,res,next)=>{
//     console.log("Respone 1")
//     next()      //IT transfer the calling of API res.send will be called after it
//     res.send("1st response API")    //this make set headers after they are sent to client error!

//     //Route Handler
// },(req,res,next)=>{
//     console.log("Response 2");
//     next()
//     res.send("2nd response API")
// })



//Middlewares

//Handle Auth Middleware for all requests

//1st
app.use("/admin",adminAuth)

//2nd
app.get("/admin/getAdmin", (req, res) => {
    res.send("Admin logged in")
})


app.get("/admin/deleteAdmin", (req, res) => {
    res.send("Admin deleted in")
})

app.use("/dummy",dummyMiddleware);

app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("Something went wrong")
    }
})



app.get("/dummy/login",(req,res)=>{
    // try{
        throw new Error("DASads")
        res.send("Dummy Login Successfully")
    // }catch(err){
    //     res.status(500).send("Some 500 Error")
    // }
})


app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("Something went wrong")
    }
})



app.listen(7777, () => {
    console.log("Server is successfully listening on port 7777...");
})