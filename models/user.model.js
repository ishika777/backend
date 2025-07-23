const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "seller", "buyer"],
        required: true
    },
    //adv authentication and authorisation
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationCode: {
        type: String
    },
    verificationCodeExpiresAt: {
        type: Date
    }
}, { timestamps: true })

const User = mongoose.model("User", userSchema)
module.exports = User;