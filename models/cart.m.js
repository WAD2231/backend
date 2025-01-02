const db = require('./db');
const SCHEMA = process.env.DB_SCHEMA || 'public';

module.exports = {
    get: async (userID, size, page) => {
        try {
            const sql1 = `
                SELECT 
                    json_build_object (
                        'id', c.product_id,
                        'name', p.product_name,
                        'price', p.price,
                        'discount', p.discount,
                        'quantity', p.quantity,
                        'images', (
                            SELECT json_agg (image_url)
                            FROM ${SCHEMA}.images
                            WHERE product_id = p.product_id
                        )
                    ) AS product,
                    c.quantity AS quantity
                FROM ${SCHEMA}.carts c
                JOIN ${SCHEMA}.products p ON c.product_id = p.product_id
                WHERE c.user_id = $1
                LIMIT $2 OFFSET $3
            `;

            const items = await db.any(sql1, [userID, size, (page - 1) * size]);
            const sql2 = `
                SELECT COUNT(*) AS total_item
                FROM ${SCHEMA}.carts
                WHERE user_id = $1
            `;
            const info = await db.one(sql2, [userID]);

            return {
                user_id: userID,
                paging: {
                    total_item: parseInt(info.total_item),
                    total_page: Math.ceil(info.total_item / size),
                    current_page: page,
                    page_size: size
                },
                items: items
            };
        }
        catch (err) {
            throw err;
        }
    }
};