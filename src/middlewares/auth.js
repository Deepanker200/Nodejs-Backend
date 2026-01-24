const User = require("../models/user");

const jwt = require("jsonwebtoken")

const userAuth = async (req, res, next) => {
    //Read the token from req.cookies
    //Validate the token
    //Find the user

    try{
    const { token } = req.cookies;

    if(!token){
        throw new Error("Token is Invalid");
    }
    const decodedObject = await jwt.verify(token, "DEV@Tinder$790")

    const {_id}=decodedObject;
    const user=await User.findById(_id);
    
    if(!user){
        throw new Error("User not found");
    }

    req.user=user;


    next();
}catch(err){
    res.status(400).send("ERROR: "+err.message)
}
}

module.exports = { userAuth }