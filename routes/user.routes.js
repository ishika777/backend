const express= require("express")
const router = express.Router()

const { checkAuth, signup, login, logout, verifyEmail, forgotPassword, resetpassword, sendVerificationCode, updatePersonalDetails, updateEducationalDetails, updateExperienceDetails } = require("../controllers/user.controller")
const { isAuthenticated } = require("../middlewares/isAuthenticated") 

router.route("/check-auth").get(isAuthenticated, checkAuth)
router.route("/signup").post(signup)
router.route("/login").post(login)
router.route("/logout").post(logout)
router.route("/verify-email").post(verifyEmail)
router.route("/send-code").post(sendVerificationCode)
router.route("/forgot-password").post(forgotPassword)
router.route("/reset-password/:resetToken").post(resetpassword)

router.route("/profile/update/personal").put(isAuthenticated, updatePersonalDetails)
router.route("/profile/update/education").put(isAuthenticated, updateEducationalDetails)
router.route("/profile/update/experience").put(isAuthenticated, updateExperienceDetails)




module.exports = router