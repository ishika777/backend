const express= require("express")
const router = express.Router()

const { isAuthenticated } = require("../middlewares/isAuthenticated") 
const {newJob, getAllPostedJobs, getJob, editJob, getAllJobs} = require("../controllers/job.controller")

const {saveJob, unsaveJob, getSavedJobs} = require("../controllers/savedJob.controller")

router.post("/new", isAuthenticated, newJob)
router.get("/:recruiterId/jobs", isAuthenticated, getAllPostedJobs)
router.get("/all", isAuthenticated, getAllJobs)
router.post("/get", isAuthenticated, getJob)
router.post("/edit", isAuthenticated, editJob)


router.post("/save", isAuthenticated, saveJob)
router.post("/unsave", isAuthenticated, unsaveJob)
router.get("/saved/all", isAuthenticated, getSavedJobs)




module.exports = router