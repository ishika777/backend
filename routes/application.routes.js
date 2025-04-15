const express= require("express")
const router = express.Router()

const { isAuthenticated } = require("../middlewares/isAuthenticated") 

// router.post("/new", isAuthenticated, newJob)
// router.get("/all", isAuthenticated, getAllJobs)
// router.post("/get", isAuthenticated, getJob)
// router.post("/edit", isAuthenticated, editJob)

module.exports = router