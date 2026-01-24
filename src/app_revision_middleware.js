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


app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;
    try {
        const user = await User.find({ emailId: userEmail })
        if (user.length === 0) {
            res.status(404).send("No user found!")
        } else {
            res.send(user)
        }
    } catch (err) {
        res.status(400).send("Something went wrong")
    }
})

// Feed API
app.get("/feed", async (req, res) => {
    try {
        res.send(await User.find())
    } catch (err) {
        res.status(400).send("Something went wrong!!")
    }
})

app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    // console.log(userId);

    try {
        const user = await User.findByIdAndDelete(userId);

        //When user is deleted again and again
        // if (!user) {
        //     return res.status(404).send("User not found");
        // }

        // console.log(user);

        res.send("User deleted successfully")
    } catch (err) {
        res.status(400).send("Something went wrong!")
    }
})


//Update

app.patch("/user/:userId", async (req, res) => {
    const userId = req.params?.userId;
    const data = req.body;

    try {

        const ALLOWED_UPDATES = [
            "photoUrl", "about", "gender", "age", "skills"
        ]

        const isUpdateAllowed = Object.keys(data).every((k) =>
            ALLOWED_UPDATES.includes(k)
        )

        if (!isUpdateAllowed) {
            throw new Error("Update not Allowed")
        }


        if (data?.skills?.length > 10) {
            throw new Error("Skills cannot be more than 10")
        }

        const userDetails = await User.findById(userId)
        // console.log(userDetails);

        await User.findByIdAndUpdate({ _id: userId },
            data,
            { runValidators: true })
        // console.log(userUpdate);

        res.send("User Details updated successfully");

    } catch (err) {
        res.status(400).send("UPDATE FAILED: " + err.message)
    }
})


app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("Something went wrong")
    }
})



app.listen(7777, () => {
    console.log("Server is successfully listening on port 7777...");
})