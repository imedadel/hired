const Candid = require('../models/candid.model');
const cuid = require('cuid');
// const sanitizeHtml = require('sanitize-html');
// TODO: Add sanitizeHTML to Candidate's properties to avoid security issues

// Get all candidates
function getCandids(req, res) {
    Candid.find().sort('-dateAdded').exec((err, candids) => {
        if(err) {
            res.status(500).send(err);
        }
        res.json({ candids });
    });
}

// Post a candidate
function postCandid(req, res) {
    // if(!req.body.candid.fullName) {
    //     res.status(403).end();
    // }

    // if name is specified
    const newCandid = new Candid(req.body);
    newCandid.cuid = cuid();
    newCandid.save((err) => {
        if(err) {
            res.status(500).send(err);
        }
        res.json({ message: "Candidate successfully added!" })
    });
}


// Get one Candidate
function getCandid(req, res) {
    Candid.findOne({ cuid: req.params.cuid }).exec((err, candid) => {
        if(err) {
            res.status(500).send(err);
        }
        res.json({ candid });
    });
}

// Update a Candidate
function putCandid(req, res) {
    Candid.findOneAndUpdate({ cuid: req.params.cuid }, req.body.candid, (err, doc) => {
        if(err) {
            res.status(500).send(err);
        }
    });
}

// Delete one Candidate
function deleteCandid(req, res) {
    Candid.findOneAndDelete({ cuid: req.params.cuid }, (err, doc) => {
        if(err) {
            res.status(500).send(err);
        }
    });
}

module.exports = {
    getCandid,
    getCandids,
    putCandid,
    deleteCandid,
    postCandid
};
