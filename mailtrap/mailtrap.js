require("dotenv").config()
const { MailtrapClient } = require("mailtrap");

module.exports.client = new MailtrapClient({
  token: process.env.MAILTRAP_API_TOKEN,
});

module.exports.sender = {
  email: "hello@demomailtrap.com",
  name: "SkillSort",
};