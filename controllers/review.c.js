const Review = require('../models/review.m');

module.exports = {
    postReview: async (req, res) => {
        try {
            const review = req.body;
            review.user_id = req.user.user_id;
            await Review.postReview(review);
            res.status(201).send('Review posted');
        }
        catch (error) {
            res.status(500).send('An error occurred while posting the review');
        }
    },

    getReviews: async (req, res) => {
        try {
            const id = parseInt(req.query.id);
            const page = parseInt(req.query.page) || 1;
            const size = parseInt(req.query.size) || 5;
            const data = await Review.getReviews(id, size, page);
            res.status(200).json(data);
        }
        catch (error) {
            res.status(500).send({ message: error.message });
        }
    }
};