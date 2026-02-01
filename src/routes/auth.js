const express = require('express');
const { validateSignUpData } = require('../utils/validation');
const User = require('../models/user');
const bcrypt = require("bcrypt");
const { userAuth } = require('../middlewares/auth');

const authRouter = express.Router()


authRouter.post("/signup", async (req, res) => {
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

authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId: emailId });

        if (!user) {
            throw new Error("EmailId is not present in DB")
        }


        const isPasswordValid = await user.validatePassword(password)
        if (isPasswordValid) {

            const token = await user.getJWT();

            // console.log(token);


            //Add the token to cookie and send the response back to the user
            res.cookie("token", token,
                { expires: new Date(Date.now() + 8 * 3600000) }
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


authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now())
    }).send("Logout successful")

})

module.exports = authRouter