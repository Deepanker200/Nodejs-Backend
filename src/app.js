const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation")
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

const app = express();        //Calling the function

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
    // const userObj={
    //     firstName:"Virat",
    //     lastName:"Kohli",
    //     emailId:"virat@gmail.com",
    //     password:"Virat123"
    // };
    try {
        //Validation of Data
        validateSignUpData(req)
        const { firstName, lastName, emailId, password } = req.body;

        //Encrpyt the password
        const passwordHash = await bcrypt.hash(password, 10)
        // console.log(passwordHash);


        //User is a collection
        const user = new User({
            firstName, lastName, emailId, password: passwordHash
        })

        await user.save()
        res.send("User Added Successfully")
    }
    catch (err) {
        res.status(400).send("Error saving the user: " + err.message)
    }
})

app.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId: emailId });

        if (!user) {
            throw new Error("EmailId is not present in DB")
        }


        const isPasswordValid = bcrypt.compare(password, user.password)

        if (isPasswordValid) {

            //Create a JWT Token
            const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790",{
                expiresIn:"0d"
            })

            console.log(token);


            //Add the token to cookie and send the response back to the user
            res.cookie("token", token,
                {expires:new Date(Date.now()+8*3600000)}
            )

            res.send("Login Successfully")
        }
        else {
            throw new Error("Password is not correct")
        }


    } catch (err) {
        res.status(400).send("ERROR : " + err.message)
    }
})


app.get("/profile", userAuth, async (req, res) => {

    try {

        res.send(req.user)

    } catch (err) {
        res.status(400).send("ERROR : " + err.message)
    }
})


app.post("/sendConnectionRequest", userAuth, async (req, res) => {
    console.log("Request sent by " + req.user.firstName);

    res.send("Request has been sent by " + req.user.firstName)
})


connectDB().then(() => {
    console.log("DB connection established...");
    app.listen(7777, () => {
        console.log("Server is successfully listening on port 7777...");
    })
}).catch(err => {
    console.error("DB cannot connected!");
})