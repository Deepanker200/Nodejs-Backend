const express = require("express");
const { adminAuth } = require("./middlewares/auth");
const { dummyMiddleware } = require("./middlewares/dummyMiddleware");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();        //Calling the function

app.use(express.json());


app.post("/signup",async(req,res)=>{
    // const userObj={
    //     firstName:"Virat",
    //     lastName:"Kohli",
    //     emailId:"virat@gmail.com",
    //     password:"Virat123"
    // };

    //User is a collection
    const user= new User(req.body)

    try{
        await user.save()
        res.send("User Added Successfully")
    }
    catch(err){
        res.status(400).send("Error saving the user: "+err.message)
    }
})


app.get("/user",async(req,res)=>{
    const userEmail=req.body.emailId;
try{
    const user=await User.find({emailId:userEmail})
    if(user.length===0){
        res.status(404).send("No user found!")
    }else{
        res.send(user)
    }
}catch(err){
    res.status(400).send("Something went wrong")
}
})

// Feed API
app.get("/feed",async(req,res)=>{
    try{
        res.send(await User.find({}))
    }catch(err){
        res.status(400).send("Something went wrong!!")
    }
})




connectDB().then(() => {
    console.log("DB connection established...");
    app.listen(7777, () => {
    console.log("Server is successfully listening on port 7777...");
})
}).catch(err => {
    console.error("DB cannot connected!");
})