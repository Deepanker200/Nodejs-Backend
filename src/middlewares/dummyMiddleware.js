const dummyMiddleware=(req,res,next)=>{
    const dummyToken="abc"
    if(!(dummyToken==="abc")){
        res.status(401).send("Unauthorized for Dummy Route")
    }
    else{
        next();
    }
}

module.exports={dummyMiddleware}