const router = require('express').Router();
const ReviewC = require('../controllers/review.c');

router.post('/', ReviewC.postReview);

router.get('/', ReviewC.getReviews);

module.exports = router;
