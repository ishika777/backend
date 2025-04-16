const mongoose = require("mongoose");

const applicationScheema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ["Applied", "Shortlisted", "Interviewed", "Selected", "Rejected"],
        default: "Applied"
    },
    resumeLink: {
        type: String,
        required: true
    },
    coverLetterLink: {
        type: String,
        required: true
    },
    appliedAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true })

const Application = mongoose.model("Application", applicationScheema)
module.exports = Application;