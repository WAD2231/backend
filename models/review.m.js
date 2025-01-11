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

    getReviews: async (id, size, page) => {
        try {
            const sql1 = `
                SELECT 
                    r.review_id as id,
                    r.content as content,
                    r.rating as rating,
                    r.posted_at as posted_at,
                    json_build_object(
                        'id', u.user_id,
                        'fullname', u.fullname,
                        'avatar', u.avatar
                    ) as user
                FROM ${SCHEMA}.reviews r 
                JOIN ${SCHEMA}.users u ON r.user_id = u.user_id
                WHERE product_id = $1
                LIMIT $2 OFFSET $3
            `;
    
            const reviews = await db.any(sql1, [id, size, size * (page - 1)]) || [];
            
            const sql2 = `
                SELECT 
                    COALESCE(COUNT(*), 0) as total_item,
                    COALESCE(ROUND(AVG(rating), 1), 0) as average_rating
                FROM ${SCHEMA}.reviews
                WHERE product_id = $1
            `;

            const info = await db.one(sql2, [id]);
            return {
                paging: {
                    total_item: parseInt(info.total_item),
                    total_page: Math.ceil(parseInt(info.total_item) / size),
                    current_page: page,
                    page_size: size
                },
                average_rating: Number(info.average_rating),
                reviews: reviews
            }
        } catch (error) {
            throw error;
        }
    }
};