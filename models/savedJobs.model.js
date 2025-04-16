const mongoose = require("mongoose");

const savedJobSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    jobs: [
        {
          job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
          savedAt: { type: Date, default: Date.now }
        }
      ],
});

const SavedJob = mongoose.model("SavedJob", savedJobSchema)
module.exports = SavedJob;

