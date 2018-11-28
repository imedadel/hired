const router = require('express').Router();
const candidController = require('../controllers/candid.controller');

// Get All Candidates
router.route('/candids').get(candidController.getCandids);
// router.get('/candids', (req, res) => {
//     candidController.getCandids(req, res);
// });

// Get One Candidate by cuid
router.route('/candids/:cuid').get(candidController.getCandid);

// Add One New Candidate
router.route('/candids').post(candidController.postCandid);

// Update One Candidate by cuid
router.route('/candids/:cuid').put(candidController.putCandid);

// Delete One Candidate by cuid
router.route('/candids/:cuid').delete(candidController.deleteCandid);

module.exports = router;




