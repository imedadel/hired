const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const jobSchema = new Schema(
    {
        cuid: {type: String, required: true},
        dateAdded: { type: Date, default: Date.now, required: true },
        role: {type: String, required: true},
        description: String,
        gender: String,
        technologies: {type: [String]},
        skills: {type: [String]},
        minScore: Number,
        questions: [String],
        jobType: String,
        experienceLevel: String,
        qualifications: {type: [String]},
    }
);

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;