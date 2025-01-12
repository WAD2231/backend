const db = require('./db');
const { TransactionMode, isolationLevel } = require('pg-promise').txMode;
const SCHEMA = process.env.DB_SCHEMA;
const MAX_RETRIES = 5;
const RETRY_DELAY = 1000;

const createOrder = async (order, retries = 0) => {
    try {
        const orderID = await db.tx({
            mode: new TransactionMode({
                tiLevel: isolationLevel.repeatableRead
            })
        }, async t => {
            for (let detail of order.details) {
                const result = await t.one(`
                    SELECT stock
                    FROM ${SCHEMA}.product
                    WHERE product_id = $1  
                    FOR UPDATE
                `, [detail.product_id]);

                if (result.stock < detail.quantity) {
                    throw new Error('Insufficient stock');
                }
            };

            const newOrder = await t.one(`
                    INSERT INTO ${SCHEMA}.orders (total, user_id)
                    VALUES ($1, $2)
                    RETURNING order_id
                `, [order.total, order.user_id]);

            for (let detail of order.details) {
                await t.none(`
                        INSERT INTO ${SCHEMA}.order_details (order_id, product_id, quantity, subtotal)
                        VALUES ($1, $2, $3, $4)
                    `, [newOrder.order_id, detail.product_id, detail.quantity, detail.subtotal]);

                await t.none(`
                        UPDATE ${SCHEMA}.product
                        SET stock = stock - $1
                        WHERE product_id = $2    
                    `, [detail.quantity, detail.product_id]);
            }

            return newOrder.order_id;
        })

        return orderID;
    }
    catch (err) {
        if (err.code === '40001' && retries < MAX_RETRIES) { 
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY)); 
            return createOrder(order, retries + 1);
        } else {
            throw err;
        }
    }
};

module.exports = {
    createOrder,

    updateStatus: async (id) => {
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
    },

    getOrdersOfUser: async (userID, page, size, order, status, date) => {
        try {
            const sortOptions = {
                'date_asc': 'o.order_date ASC',
                'date_desc': 'o.order_date DESC',
                'total_asc': 'o.total ASC',
                'total_desc': 'o.total DESC',
                'id_asc': 'o.order_id ASC',
                'id_desc': 'o.order_id DESC'
            }

            const query1 = 
            `
                SELECT 
                    COUNT(*) OVER()::INTEGER AS total_item,
                    o.order_id,
                    o.total,
                    o.status,
                    o.order_date,
                    json_agg(json_build_object(
                        'id', od.order_detail_id,
                        'product', json_build_object(
                            'id', p.product_id,
                            'name', p.product_name,
                            'price', p.price,
                            'images',  (
                                SELECT json_agg(image_url)
                                FROM product_image
                                WHERE product_id = p.product_id
                            ),
                            'category', json_build_object(
                                'id', c.category_id,
                                'name', c.name
                            ),
                            'manufacturer', json_build_object(
                                'id', m.manufacturer_id,
                                'name', m.manufacturer_name
                            )
                        ),
                        'quantity', od.quantity,
                        'subtotal', od.subtotal
                    )) AS details
                FROM orders o JOIN order_details od ON o.order_id = od.order_id
                JOIN product p ON od.product_id = p.product_id
                JOIN category c ON p.category_id = c.category_id
                JOIN manufacturer m ON p.manufacturer_id = m.manufacturer_id
                WHERE o.user_id = $1
                ${status ? ` AND o.status = '${status}' ` : ' '}
                ${date ? ` AND o.order_date::date = '${date}' ` : ' '}
                GROUP BY o.order_id, o.total, o.status, o.order_date
                ORDER BY ${sortOptions[order]}
                OFFSET $2 LIMIT $3;
            `;

            const result = await db.any(query1, [userID, (page - 1) * size, size]);
            const total_item = result.length > 0 ? result[0].total_item : 0;

            return {
                paging: {
                    current_page: page,
                    page_size: size,
                    total_item: total_item,
                    total_page: Math.ceil(total_item / size)
                },
                filter: {
                    order: order,
                    status: status,
                    date: date
                },
                orders: result
            }
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
};