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
    },

    getRevenueByMonth: async () => {
        try {
            const query = `
                SELECT
                    EXTRACT(MONTH FROM order_date)::INTEGER AS month,
                    EXTRACT(YEAR FROM order_date)::INTEGER AS year,
                    SUM(total)::REAL AS revenue
                FROM ${SCHEMA}.orders
                GROUP BY month, year
                LIMIT 12
            `;
            const revenue = await db.any(query);
            return revenue;
        }
        catch (err) {
            throw err;
        }
    },

    getBestSellers: async (limit) => {
        try {
            const query = `
                SELECT 
                    p.product_id as id, 
                    p.product_name as name,  
                    SUM(d.quantity)::INTEGER as quantity
                FROM ${SCHEMA}.order_details d
                JOIN ${SCHEMA}.product p ON d.product_id = p.product_id
                GROUP BY p.product_id, p.product_name
                ORDER BY quantity DESC 
                LIMIT $1
            `;
            const result = await db.any(query, [limit]);
            return result;
        }
        catch (error) {
            throw error;
        }
    },

    getTopCustomers: async (limit) => {
        try {
            const query = `
                SELECT 
                    u.user_id as id, 
                    u.fullname as fullname,  
                    SUM(o.total)::INTEGER as total
                FROM ${SCHEMA}.orders o
                JOIN ${SCHEMA}.users u ON o.user_id = u.user_id
                GROUP BY u.user_id, u.fullname
                ORDER BY total DESC 
                LIMIT $1
            `;
            const result = await db.any(query, [limit]);
            return result;
        }
        catch (error) {
            throw error;
        }
    },

    getPendingOrders: async () => {
        try {
            return await db.any(`
                SELECT 
                    o.order_id as order_id,
                    o.total as amount,
                    u.account_id as account_id
                FROM ${SCHEMA}.orders o
                JOIN ${SCHEMA}.users u ON u.user_id = o.user_id
                WHERE status = 'pending'    
            `);
        }
        catch (error) {
            throw error;
        }
    }
};