const validator = require("validator")

const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body

    if (!firstName || !lastName) {
        throw new Error("Name is not valid")
    }

    else if (firstName.length < 4 || firstName.length > 50) {
        throw new Error("FirstName should be 4 to 50 characters")
    }

    else if (!validator.isEmail(emailId)) {
        throw new Error("Email is not Valid")
    }

    else if (!validator.isStrongPassword(password)) {
        throw new Error("Password is not strong")
    }

}

const validateProfileEditData = (req) => {
    const allowedEditFields = ["firstName", "lastName", "emailId", "photoUrl", "about", "skills","age","gender"]

    const isEditAllowed = Object.keys(req.body).every(field =>
        allowedEditFields.includes(field)
    )

    return isEditAllowed;
}

module.exports = { validateSignUpData, validateProfileEditData }