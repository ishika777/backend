const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ["Recruiter", "Employee"],
        required: true
    },
    data: { 
        type: mongoose.Schema.Types.ObjectId, 
        refPath: "role"
    },
    // lastLogin : {
    //     type : Date,
    //     default : Date.now
    // },
    // isVerified : {
    //     type : Boolean,
    //     default : false
    // },
    // resetPasswordToken : {
    //     type : String,
    // },
    // resetPasswordTokenExpiresAt : {
    //     type : Date
    // },
    // verificationCode : {
    //     type : String
    // },
    // verificationCodeExpiresAt : {
    //     type : Date
    // }
}, {timestamps : true})

const User = mongoose.model("User", userSchema)
module.exports = User;