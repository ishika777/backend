const Job = require("../models/job.model");
const User = require("../models/user.model.js");
const SavedJob = require("../models/savedJobs.model.js")


module.exports.saveJob = async (req, res) => {
    try {
        const { id } = req.body;
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
                message: "User is not a Employee"
            });
        }

        const job = await Job.find(id);
        if(!job){
            return res.status(404).json({
                success : false,
                message : "Job not found"
            });
        }
        await SavedJob.create({
            employee: user,
            job
        })
        return res.status(200).json({
            success : true,
            message: "Job is successfully saved!"
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports.unsaveJob = async (req, res) => {
    try {
       //send saved jobs after updating

       //save job me bhiiiiii, use update kr

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
module.exports.getSavedJobs = async (req, res) => {
    try {
       const userId = req.id;
       //is id se sari saved job fetch krni h

       //savedJobs bhejna h to frontend teeno me
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" });
    }
}