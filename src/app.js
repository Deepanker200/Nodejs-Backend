const express=require("express")

const app=express();        //Calling the function

app.use("/user",(req,res,next)=>{
    console.log("Respone 1")
    next()      //IT transfer the calling of API res.send will be called after it
    res.send("1st response API")
    
    //Route Handler
},(req,res,next)=>{
    console.log("Response 2");
    next()
    res.send("2nd response API")
})

app.listen(7777,()=>{
    console.log("Server is successfully listening on port 7777...");
})