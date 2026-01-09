const { mongoose } = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://deepamamazing_db_user:zJzjfVP5PKBJyDiv@testmongoonline.e26xsjc.mongodb.net/devTinders")
}


module.exports=connectDB;

