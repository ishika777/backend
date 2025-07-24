const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs")

const { generateToken } = require("../utils/generateToken.js")
const { generateVerificationCode } = require("../utils/generateVerificationCode.js")
const { sendVerificationEmail, sendWelcomeEmail } = require("../mailtrap/email.js")


module.exports.signup = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        if (!["admin", "seller", "buyer"].includes(role)) {
            return res.status(400).json({
                success: false,
                message: "Invalid role"
            });
        }

        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exist with this email"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const verificationCode = generateVerificationCode(6)

        user = await User.create({
            email,
            password: hashedPassword,
            role,
            verificationCode,
            verificationCodeExpiresAt: Date.now() + 24 * 60 * 60 * 1000 //1day
        })

        generateToken(res, user)


        await sendVerificationEmail(email, verificationCode)

        const io = req.app.locals.io;
        io.emit('newSignup', {
            userId: user._id,
            email: user.email,
            role: user.role,
            message: 'New user signed up'
        });

        const userWithoutPassword = await User.findOne({ email }).select("-password")
        return res.status(201).json({
            success: true,
            message: "Account created successfully",
            user: userWithoutPassword
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }


        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password"
            });

        }
        if (!user.isVerified) {
            return res.status(400).json({
                success: false,
                message: "Email not verified"
            });

        }

        const isCorrectPassword = await bcrypt.compare(password, user.password)
        if (!isCorrectPassword) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password"
            });

        }

        generateToken(res, user)

        const userWithoutPassword = await User.findOne({ email }).select("-password")
        return res.status(200).json({
            success: true,
            message: `Welocme back ${user.fullname}`,
            user: userWithoutPassword
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports.logout = async (req, res) => {
    try {
        return res.clearCookie("token").status(200).json({
            success: true,
            message: "Looged out successfully"
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports.checkAuth = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        return res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports.verifyEmail = async (req, res) => {
    try {
        const { verificationCode } = req.body;

        if (!verificationCode) {
            return res.status(400).json({
                success: false,
                message: "Verification code is required"
            });
        }


        const user = await User.findOne({ verificationCode: verificationCode, verificationCodeExpiresAt: { $gt: Date.now() } }).select("-password")

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or Expired verification code"
            })
        }

        user.isVerified = true;
        user.verificationCode = undefined;
        user.verificationCodeExpiresAt = undefined;
        await user.save()

        await sendWelcomeEmail(user.email, user.fullname)

        return res.status(200).json({
            success: true,
            message: "Email verified successfully",
            user
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}