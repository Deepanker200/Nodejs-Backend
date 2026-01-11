const express=require("express")

const app=express();        //Calling the function

//Request Handler function


// app.use("/test/2",(req,res)=>{
//     res.send("Hello from the test server22")
// })


app.post("/user",(req,res)=>{
    res.send("This is user call")
})

app.use("/test",(req,res)=>{
    res.send("Hello from the test server")
})


app.get("/a/",(req,res)=>{
    res.send("AAAA")
})



// app.use("/",(req,res)=>{
//     res.send("Hello Deepanker")
// })

app.listen(7777,()=>{
    console.log("Server is successfully listening on port 7777...");
})