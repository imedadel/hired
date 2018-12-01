const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const candidSchema = new Schema(
    {
        cuid: {type: String, required: true},
        dateAdded: { type: Date, default: Date.now, required: true },
        fullName: {type: String, required: true},
        isStudent: Boolean,
        hasJob: Boolean,
        hasInternship: Boolean,
        matchedTech: Number,
        score: Number,
        hasDegree: Boolean,
        universitiesName: [String],
        clubsName: [String],
        phoneNumber: Number,
        email: String,
        gender: String,
        wantedJob: String,
        socialScore: Number,
        socialLinks: [String],
        answers: [String],
        isConfirmed: Boolean,
        isInvited: Boolean,
        details: [{
            traitsName: [String],
            traitsRate: [Number],
            traitsComment: [String],
        }]
    }
);

const Candid = mongoose.model('Candid', candidSchema);

module.exports = Candid;