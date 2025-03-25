const jwt = require("jsonwebtoken")

module.exports.generateToken = (res, user) => {
    const token = jwt.sign({userId : user._id}, process.env.SECRET_KEY, {expiresIn : "1d"})
    res.cookie("token", token, {httpOnly:true, sameSite : "strict", maxAge : 24*60*60*1000})
    return token
}