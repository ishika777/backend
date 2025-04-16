const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Ensure role is 'employee' when creating
    required: true,
  },
  title: {
    type: String, // Example: "Frontend Resume", "General CV"
    required: true,
  },
  summary: {
    type: String,
  },
  skills: [String], // ["JavaScript", "React", "Node.js"]
  
  education: [
    {
      institution: String,
      degree: String,
      fieldOfStudy: String,
      startYear: Number,
      endYear: Number,
      grade: String,
    },
  ],

  experience: [
    {
      company: String,
      role: String,
      startDate: Date,
      endDate: Date,
      description: String,
    },
  ],

  projects: [
    {
      title: String,
      description: String,
      link: String,
      techStack: [String],
    },
  ],


  certifications: [
    {
      name: String,
      issuer: String,
      issueDate: Date,
      link: String,
    },
  ],

  fileUrl: {
    type: String, // Path to generated PDF or public URL
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Resume", resumeSchema);
