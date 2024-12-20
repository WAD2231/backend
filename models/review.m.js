const db = require('./db');
const SCHEMA = process.env.DB_SCHEMA;

module.exports = {
    postReview: async (review) => {
        try {
            const query = `
                INSERT INTO ${SCHEMA}.reviews (content, rating, product_id, user_id)
                VALUES ($1, $2, $3, $4)
            `;
            const values = [review.content, review.rating, review.product_id, review.user_id];
            await db.query(query, values);
        }
        catch (error) {
            throw error;
        }
    },

    getReviews: async (id) => {
        try {
            const query = `
                SELECT 
                    COUNT(r.rating) AS total,
                    ROUND(AVG(r.rating), 1) AS average,
                    json_agg(
                        json_build_object(
                            'id', r.review_id,
                            'content', r.content,
                            'rating', r.rating,
                            'posted_at', r.posted_at,
                            'user', json_build_object(
                                'id', u.user_id,
                                'name', p.name
                            )
                        )
                    ) AS reviews
                FROM ${SCHEMA}.reviews r 
                JOIN ${SCHEMA}.users u ON r.user_id = u.user_id
                JOIN ${SCHEMA}.profile p ON p.user_id = u.user_id
                WHERE product_id = $1
            `;
            const result = await db.oneOrNone(query, [id]);
            return {
                product_id: id,
                ...result
            };
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
};