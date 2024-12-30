const { get } = require('../routers/user.r');
const db = require('./db');
const SCHEMA = process.env.DB_SCHEMA;

module.exports = {
    getProduct: async (field, value) => {
        try {
            const query = `
                SELECT pr.product_id as id,
                    pr.product_name as name,
                    pr.product_price as price
                    pr.description as description,
                FROM ${SCHEMA}.products pr
                WHERE ${field} = $1
            `;
            const product = await db.oneOrNone(query, [value]);
            return product;
        } catch (error) {
            throw error;
        }
    },
    getProducts: async () => {
        try {
            const query = `
                SELECT pr.product_id as id,
                    pr.product_name as name,
                    pr.product_price as price
                    pr.description as description,
                FROM ${SCHEMA}.products pr
            `;
            const products = await db.manyOrNone(query);
            return products;
        } catch (error) {
            throw error;
        }
    }

}