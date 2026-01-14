const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLentgh: 4,
        maxLength: 50
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        validate(value) {
            if (!["male", "female", "others"].includes(value)) {
                throw new Error("Gender data is not allowed")
            }
        }
    },
    photoUrl: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBj-1KIYtvjs4ft-nBOoDvTshg3UtK02xhhA&s"
    },
    about: {
        type: String,
        default: "This is a default about of the user"
    },
    skills: {
        type: [String]
    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model("User", userSchema)

