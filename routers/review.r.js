const router = require('express').Router();
const ReviewC = require('../controllers/review.c');
const {verifyUser} = require('../middlewares/authorize');

router.post('/', verifyUser, ReviewC.postReview);

router.get('/', verifyUser, ReviewC.getReviews);

module.exports = router;
