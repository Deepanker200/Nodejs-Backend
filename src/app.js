const express = require("express");
const { dummyMiddleware } = require("./middlewares/dummyMiddleware");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation")
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt=require("jsonwebtoken")


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
            const token=await jwt.sign({_id:user._id},"DEV@Tinder790")
            console.log(token);
            

            //Add the token to cookie and send the response back to the user
            res.cookie("token", token)

            res.send("Login Successfully")
        }
        else {
            throw new Error("Password is not correct")
        }


    } catch (err) {
        res.status(400).send("ERROR : " + err.message)
    }
})


app.get("/profile", async (req, res) => {
    const cookies = req.cookies;

    const { token } = cookies;
    
    const decodedMessage=await jwt.verify(token,"DEV@Tinder790")

    const {_id}=decodedMessage;


    console.log(decodedMessage);
    const user=await User.findById(_id);
    // console.log(user.firstName);
    

    // console.log(cookies);
    res.send("Reading cookie: " + user)
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

connectDB().then(() => {
    console.log("DB connection established...");
    app.listen(7777, () => {
        console.log("Server is successfully listening on port 7777...");
    })
}).catch(err => {
    console.error("DB cannot connected!");
})