const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const userRouter = express.Router()

const USER_SAFE_DATA = ["firstName", "lastName", "skills", "about", "age", "gender"]

//Pending requests
userRouter.get("/user/requests", userAuth, async (req, res) => {
    try {
        const user = req.user;

        const dataUser = await ConnectionRequest.find({
            toUserId: user._id,
            status: "interested"
        }).populate("fromUserId", ["firstName", "lastName", "photo", "about", "skills"])

        // console.log(dataUser)

        res.json({ message: "Data fetched successfully: ", data: dataUser })


    } catch (err) {
        res.status(400).json({ message: "ERROR: " + err.message })
    }
})

userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {

        const loggedInUser = req.user;

        const connectionData = await ConnectionRequest.find({
            $or: [
                {
                    fromUserId: loggedInUser._id
                }, {
                    toUserId: loggedInUser._id
                }
            ],
            status: "accepted"
        }).populate("fromUserId", USER_SAFE_DATA)
            .populate("toUserId", USER_SAFE_DATA)



        const data = connectionData.map((row) => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId
            }
            return row.fromUserId
        })

        res.json({ message: "Connections Details: ", data })

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

userRouter.get("/feed", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const data = await ConnectionRequest.find(
            {
               $or:[{ fromUserId: loggedInUser._id},{toUserId:loggedInUser._id}],
                // status: {
                //     $nin: ["interested", "accepted", "ignored", "rejected"]
                // }
            }
        )
        .select("fromUserId toUserId")
        .populate("fromUserId", "firstName")
        .populate("toUserId", "firstName")

        res.json({ data: "Data fetched successully: ", message: data })

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

module.exports = userRouter;