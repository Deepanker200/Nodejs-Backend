const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const cookieParser = require("cookie-parser");
const cors = require("cors")


const app = express();        //Calling the function
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))


//Reads JSON and convert it into JavaScript Object
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

// app.use("/user",(req,res,next)=>{
//     console.log("Respone 1")
//     next()      //IT transfer the calling of API res.send will be called after it
//     res.send("1st response API")    //this make set headers after they are sent to client error!

//     //Route Handler
// },(req,res,next)=>{
//     console.log("Response 2");
//     // next()
//     // res.send("2nd response API")
// })

app.use("/",(req,res)=>{
    
    res.send("No Route Caught");
})

app.use("/nn",(req,res)=>{
    
    res.send("NN Caught");
})

app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", requestRouter)
app.use("/", userRouter)


app.get("/test1",(req,res)=>{
    const search=req.query;
    res.send(search);
})

app.get("/test2/:id/:user",(req,res)=>{
    console.log(req.params);
    res.send(`This user is ${id}`);
})

connectDB().then(() => {
    console.log("DB connection established...");
    app.listen(7777, () => {
        console.log("Server is successfully listening on port 7777...");
    })
}).catch(err => {
    console.error("DB cannot connected!");
})