const express=require("express")
const { userAuth } = require("../middlewares/auth");

const requestRouter=express.Router()


requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
    console.log("Request sent by " + req.user.firstName);

    res.send("Request has been sent by " + req.user.firstName)
})


module.exports=requestRouter;