const router = require('express').Router();
const jobController = require('../controllers/job.controller');

// Get All Candidates
router.route('/jobs').get(jobController.getJobs);
// router.get('/candids', (req, res) => {
//     candidController.getCandids(req, res);
// });

// Get One Candidate by cuid
router.route('/jobs/:cuid').get(jobController.getJob);

// Add One New Candidate
router.route('/jobs').post(jobController.postJob);

// Update One Candidate by cuid
router.route('/jobs/:cuid').put(jobController.putJob);

// Delete One Candidate by cuid
router.route('/jobs/:cuid').delete(jobController.deleteJob);

module.exports = router;




