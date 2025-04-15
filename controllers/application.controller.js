const Application = require("../models/application.model");
const Job = require("../models/job.model");
const User = require("../models/user.model.js");


module.exports.getAllApplications = async(req, res) => {
    try {
        const recruiterId = req.id;
        const user = await User.findById(recruiterId);
        if(!user){
            return res.status(404).json({
                success : false,
                message : "User not found"
            });
        }
        if(user.role !== "Recruiter"){
            return res.status(403).json({
                success : false,
                message : "User is not a recruiter"
            });
        }

        const allApplications = await Application.find({recruiterId}).populate("jobId").populate("userId");
        allApplications.reverse(); // to show the latest application first
        return res.status(200).json({
            success : true,
            allApplications
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({message : "Internal Server Error"});
    }
}
module.exports.getAllApplicants = async(req, res) => {
    try {
        const recruiterId = req.id;
        const user = await User.findById(recruiterId);
        if(!user){
            return res.status(404).json({
                success : false,
                message : "User not found"
            });
        }
        if(user.role !== "Recruiter"){
            return res.status(403).json({
                success : false,
                message : "User is not a recruiter"
            });
        }

        const { jobId } = req.body;
        const job = await Job.findById(jobId).populate("recruiterId");
        if(!job){
            return res.status(404).json({
                success : false,
                message : "Job not found"
            });
        }
        const allApplications = await Application.find({jobId}).populate("jobId").populate("userId");
        allApplications.reverse(); // to show the latest application first
        return res.status(200).json({
            success : true,
            allApplications
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({message : "Internal Server Error"});
    }
}