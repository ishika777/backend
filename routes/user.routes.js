const express = require("express")
const router = express.Router()

const { checkAuth, signup, login, logout, verifyEmail } = require("../controllers/user.controller")
const { isAuthenticated } = require("../middlewares/isAuthenticated")

router.route("/signup").post(signup)

router.route("/login").post(login)

router.route("/logout").post(logout)

router.route("/check-auth").get(isAuthenticated, checkAuth)

router.route("/verify-email").post(verifyEmail)







module.exports = router