const express= require("express")
const router = express.Router()

const { isAuthenticated } = require("../middlewares/isAuthenticated") 
const {applyForJob, getAllAppliedJobs} = require("../controllers/application.controller")
const upload = require("../middlewares/multer")


router.post("/apply", isAuthenticated, upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "cv", maxCount: 1 },
]), applyForJob)

router.get("/all", isAuthenticated, getAllAppliedJobs)

module.exports = router