const express = require('express')
const { userAuth } = require("../middlewares/auth");
const { validateProfileEditData } = require('../utils/validation');
const user = require('../models/user');
const bcrypt = require("bcrypt");


const profileRouter = express.Router()



profileRouter.get("/profile/view", userAuth, async (req, res) => {

    try {

        res.send(req.user)

    } catch (err) {
        res.status(400).send("ERROR : " + err.message)
    }
})

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        if (!validateProfileEditData(req)) {
            throw new Error("Invalid Edit Request")
        }

        const loggedInUser = req.user;

        Object.keys(req.body).forEach((key) =>
            (loggedInUser[key] = req.body[key])
        )

        await loggedInUser.save()


        res.json({
            message: `${loggedInUser.firstName}, your profile updated successfully`,
            data: loggedInUser
        })

    } catch (err) {
        res.status(400).send("ERROR: " + err.message)
    }
})

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
    try {

        //Note: There is another method for this API in DevTinder Repo

        // console.log(req.user);
        const { oldPassword, newPassword } = req.body
        // console.log(oldPassword, newPassword);

        const loggedInUser = req.user

        //Checking the password
        const checkPassword = await loggedInUser.validatePassword(oldPassword)

        if (!checkPassword) {
            throw new Error("Old password is not correct")
        }

        const newPasswordHash = await bcrypt.hash(newPassword, 10)
        // console.log(newPasswordHash);

        loggedInUser.password = newPasswordHash;

        await loggedInUser.save()

        res.send("Password updated successfully")

        // res.send(req.user)
    } catch (err) {
        res.status(400).send("Error while updating the password: " + err.message)
    }

})

module.exports = profileRouter