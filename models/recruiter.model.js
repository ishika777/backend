const mongoose = require("mongoose");

const recruiterSchema = new mongoose.Schema({
    fullname : {
        type : String,
        required : true,
        trim: true
    },
    email : {
        type : String,
        required : true,
        trim: true
    },
    password : {
        type : String,
        required : true
    },
    contact : {
        type : Number,
        required : true
    },
    resume: {
        type: String,
        default: ""
    },
    profilePicture : {
        type : String,
        default : ""
    },
    url: {
        linkedIn: {type: String, required: true},
        gitHub: {type: String, required: true},
        twitter: {type: String},
        portfolio: {type: String},
    },
    experience: [
        {
            jobTitle: { type: String, required: true },
            companyName: { type: String, required: true },
            startDate: { type: Date, required: true },
            endDate: { type: Date, require: true }, // Keep null if currently working
            description: { type: String }
        }
    ],
    education: [
        {
            degree: { type: String, required: true },
            institution: { type: String, required: true },
            startDate: { type: Number, required: true },
            endDate: { type: Number, required: true }, // Optional
        }
    ],
   
}, {timestamps : true})

const Recruiter = mongoose.model("Recruiter", recruiterSchema)
module.exports = Recruiter;


