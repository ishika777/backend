const express= require("express")
const router = express.Router()

const { checkAuth, signup, login, logout, verifyEmail, forgotPassword, resetpassword } = require("../controllers/user.controller")
const { isAuthenticated } = require("../middlewares/isAuthenticated") 



router.route("/check-auth").get(isAuthenticated, checkAuth)
router.route("/signup").post(signup)
router.route("/login").post(login)
router.route("/logout").post(logout)
router.route("/verify-email").post(verifyEmail)
router.route("/forgot-password").post(forgotPassword)
router.route("/reset-password/:resetToken").post(resetpassword)

// router.route("/profile/update").put(isAuthenticated, updateProfile)




module.exports = router