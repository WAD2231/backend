const db = require('./db');
const SCHEMA = process.env.DB_SCHEMA;

module.exports = {
    createOrder: async (order) => {
        try {
            const newOrder = await db.one(`
                INSERT INTO ${SCHEMA}.orders (total, user_id)
                VALUES ($1, $2)
                RETURNING order_id
            `, [order.total, order.user_id]);

            for (let detail of order.details) {
                await db.none(`
                    INSERT INTO ${SCHEMA}.order_details (order_id, product_id, quantity, subtotal)
                    VALUES ($1, $2, $3, $4)
                `, [newOrder.order_id, detail.product_id, detail.quantity, detail.subtotal]);
            }

            return newOrder.order_id;
        }
        catch (err) {
            throw err;
        }
    },

    updateStatus: async(id) => {
        try {
            const query = `
                UPDATE ${SCHEMA}.orders
                SET status = 'completed'
                WHERE order_id = $1
            `;
            await db.none(query, [id]);
        }
        catch (err) {
            throw err;
        }
    }
};