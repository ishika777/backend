const Job = require("../models/job.model")
const User = require("../models/user.model.js");

module.exports.newJob = async(req, res) => {
    try {
        const {title, jobType, description, skills, experience, qualification, location, salary, deadline, openings} = req.body;
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
        await Job.create({
            title, jobType, description, skills, experience, qualification, location, salary, deadline, openings, recruiterId
        });
        const allJobs = await Job.find({recruiterId}).populate("recruiterId");
        allJobs.reverse(); // to show the latest job first
        return res.status(201).json({
            success : true,
            message : "Job created successfully",
            allJobs
        });  

    } catch (error) {
        console.log(error)
        return res.status(500).json({message : "Internal Server Error"});
    }
}
module.exports.getAllPostedJobs = async(req, res) => {
    try {

        const {recruiterId} = req.params;
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
        const allJobs = await Job.find({recruiterId}).populate("recruiterId");
        allJobs.reverse(); // to show the latest job first
        return res.status(200).json({
            success : true,
            allJobs
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({message : "Internal Server Error"});
    }
}
module.exports.getAllJobs = async(req, res) => {
    try {
        const today = new Date(); // Get today's date
        const allJobs = await Job.find({ deadline: { $gt: today } }).populate("recruiterId");
        allJobs.reverse(); // to show the latest job first
        return res.status(200).json({
            success : true,
            allJobs
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({message : "Internal Server Error"});
    }
}



module.exports.getJob = async(req, res) => {
    try {
        const { id } = req.body;
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
        const job = await Job.findById(id).populate("recruiterId");
        if(!job){
            return res.status(404).json({
                success : false,
                message : "Job not found"
            });
        }
        return res.status(200).json({
            success : true,
            job
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({message : "Internal Server Error"});
    }
}
module.exports.editJob = async(req, res) => {
    try {
        const {id, title, jobType, description, skills, experience, qualification, location, salary, deadline, openings} = req.body;
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
        const job = await Job.findById(id).populate("recruiterId");
        if(!job){
            return res.status(404).json({
                success : false,
                message : "Job not found"
            });
        }
        await Job.findByIdAndUpdate(id, {
            title, jobType, description, skills, experience, qualification, location, salary, deadline, openings
        }, {new : true});
        const allJobs = await Job.find({recruiterId}).populate("recruiterId");
        allJobs.reverse(); // to show the latest job first
        return res.status(200).json({
            success : true,
            message : "Job updated successfully",
            allJobs
        });

       
    } catch (error) {
        console.log(error)
        return res.status(500).json({message : "Internal Server Error"});
    }
}



