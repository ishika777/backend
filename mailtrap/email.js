const { generatePasswordResetEmailHtml, generateResetSuccessEmailHtml, generateWelcomeEmailHtml, htmlContent } = require("./htmlContent");
const {client, sender} = require("./mailtrap");

module.exports.sendVerificationEmail = async(email, verificationCode) => {
    const recipients = [
        {
          email
        }
    ];
    try {
        const response = await client.send({
            from: sender,
            to: recipients,
            subject: "Verify your email",
            html : htmlContent.replace("{verificationToken}", verificationCode),
            category: "Email Verification",
        })
    .then(console.log, console.error);
    } catch (error) {
        console.log(error)
        throw new Error("Failed to send verification email")
    }
}

module.exports.sendWelcomeEmail = async(email, name) => {
    const recipients = [
        {
          email
        }
    ];
    const htmlContent = generateWelcomeEmailHtml(name);
    try {
        const response = await client.send({
            from: sender,
            to: recipients,
            subject: "Welcome to TastyBites",
            html : htmlContent,
            template_variables : {
                company_info_name : "TastyBites",
                name : name
            }
        })
    .then(console.log, console.error);
    } catch (error) {
        console.log(error)
        throw new Error("Failed to send welcome email")
    }
}


