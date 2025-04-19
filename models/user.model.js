const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    resume: {
        type: String,
        default: ""
    },
    profilePicture: {
        type: String,
        default: ""
    },
    url: {
        linkedIn: { type: String, required: true },
        gitHub: { type: String, required: true },
        twitter: { type: String },
        portfolio: { type: String },
    },
    experience: [
        {
            _id: false,
            jobTitle: { type: String, required: true },
            companyName: { type: String, required: true },
            startDate: { type: Date, required: true },
            endDate: { type: Date, require: true },
            description: { type: String }
        }
    ],
    education: [
        {
            _id: false,
            degree: { type: String, required: true },
            institution: { type: String, required: true },
            startYear: { type: Number, required: true },
            endYear: { type: Number, required: true },
        }
    ],
    role: {
        type: String,
        enum: ["Recruiter", "Employee"],
        required: true
    },
    //adv authentication and authorisation
    lastLogin: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordTokenExpiresAt: {
        type: Date
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