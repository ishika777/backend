const Application = require("../models/application.model");
const Job = require("../models/job.model");
const User = require("../models/user.model.js");

const { uploadFileOnCloudinary } = require("../utils/imageUpload.js")


module.exports.getAllApplications = async (req, res) => {
    try {
        const recruiterId = req.id;
        const user = await User.findById(recruiterId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        if (user.role !== "Recruiter") {
            return res.status(403).json({
                success: false,
                message: "User is not a recruiter"
            });
        }

        const allApplications = await Application.find({ recruiterId }).populate("jobId").populate("userId");
        allApplications.reverse(); // to show the latest application first
        return res.status(200).json({
            success: true,
            allApplications
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports.getAllApplicants = async (req, res) => {
    try {
        const recruiterId = req.id;
        const user = await User.findById(recruiterId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        if (user.role !== "Recruiter") {
            return res.status(403).json({
                success: false,
                message: "User is not a recruiter"
            });
        }

        const { jobId } = req.body;
        const job = await Job.findById(jobId).populate("recruiterId");
        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }
        const allApplications = await Application.find({ jobId }).populate("jobId").populate("userId");
        allApplications.reverse(); // to show the latest application first
        return res.status(200).json({
            success: true,
            allApplications
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports.applyForJob = async (req, res) => {
    try {
        const userId = req.id;
        const { jobId, resumeOption } = req.body;
        let resumeLink = null;
        let resumePublicId = null;
        let coverLetterLink = null;
        let coverLetterPublicId = null;


        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        if (user.role !== "Employee") {
            return res.status(403).json({
                success: false,
                message: "User is not a recruiter"
            });
        }
        const job = await Job.findById(jobId).populate("recruiterId");
        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        if (resumeOption === "profile") {
            resumeLink = req.body.resumeUrl;
            resumePublicId = req.body.resumePublicId;
        }
        if (resumeOption === "upload" && req.files?.resume) {
            const result = await uploadFileOnCloudinary(req.files.resume[0]);
            resumeLink = result.secure_url;
            resumePublicId = result.public_id;
        }

        if (req.files?.cv) {
            const result = await uploadFileOnCloudinary(req.files.cv[0]);
            coverLetterLink = result.secure_url;
            coverLetterPublicId = result.public_id;
        }

        const application = await Application.create({
            jobId,
            userId,
            status: "Applied",
            resume: {
                url: resumeLink,
                publicId: resumePublicId
            },
            coverLetter: {
                url: coverLetterLink,
                publicId: coverLetterPublicId
            },
        });

        const applications = await Application.find({ userId }).populate("jobId").sort({ appliedAt: -1 });

        return res.status(201).json({
            success: true,
            message: "Application submitted successfully",
            application,
        });

    } catch (error) {
        console.log("Error while applying for job:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


module.exports.getAllAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        if (user.role !== "Employee") {
            return res.status(403).json({
                success: false,
                message: "User is not a recruiter"
            });
        } 

        const applications = await Application.find({ userId }).populate("jobId").sort({ appliedAt: -1 });
        return res.status(200).json({
            success: true,
            applications
        });

    } catch (error) {
        console.log("Error while applying for job:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


