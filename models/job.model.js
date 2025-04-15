const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    jobType: {
        type: String,
        required: true,
        enum: ["Full-time", "Part-time", "Remote"]
    },
    description: {
        type: String,
        required: true
    },
    skills: [{
        type: String,
        required: true
    }],
    experience: {
        type: String,
        required: true,
        enum: ["0-1", "1-3", "3-5", "5+"],
    },
    qualification: {
        type: String,
        required: true,
        enum: ["High School", "Bachelor's", "Master's", "PhD"]
    },
    location: { 
        type: String,
        required: true,
        enum: ["On-Site", "Remote", "Hybrid"]
    },
    salary: {
        type: String,
        required: true,
        trim: true
    },
    deadline: {
        type: Date,
        required: true
    },
    openings: {
        type: Number,
        required: true,
        min: 1
    },
    recruiterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
}, { timestamps: true })

const Job = mongoose.model("Job", jobSchema)
module.exports = Job;