const Job = require('../models/job.model');
const cuid = require('cuid');
// const sanitizeHtml = require('sanitize-html');
// TODO: Add sanitizeHTML to Candidate's properties to avoid security issues

// Get all jobs
function getJobs(req, res) {
    Job.find().sort('-dateAdded').exec((err, jobs) => {
        if(err) {
            res.status(500).send(err);
        }
        res.json({ jobs });
    });
}

// Post a job
function postJob(req, res) {
    // if(!req.body.candid.fullName) {
    //     res.status(403).end();
    // }

    // if name is specified
    const newJob = new Job(req.body);
    newJob.cuid = cuid();
    newJob.save((err) => {
        if(err) {
            res.status(500).send(err);
        }
        res.json({ message: "Job successfully added!" })
    });
}


// Get one Job
function getJob(req, res) {
    Job.findOne({ cuid: req.params.cuid }).exec((err, job) => {
        if(err) {
            res.status(500).send(err);
        }
        res.json({ job });
    });
}

// Update a Job
function putJob(req, res) {
    Job.findOneAndUpdate({ cuid: req.params.cuid }, req.body.job, (err, doc) => {
        if(err) {
            res.status(500).send(err);
        }
    });
}

// Delete one Job
function deleteJob(req, res) {
    Job.findOneAndDelete({ cuid: req.params.cuid }, (err, doc) => {
        if(err) {
            res.status(500).send(err);
        }
    });
}

module.exports = {
    getJob,
    getJobs,
    putJob,
    deleteJob,
    postJob
};
