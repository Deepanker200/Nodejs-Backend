const express=require("express")

const app=express();        //Calling the function

//Request Handler function
app.use("/test",(req,res)=>{
    res.send("Hello from the server")
})

app.listen(7777,()=>{
    console.log("Server is successfully listening on port 7777...");
})