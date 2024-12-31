const db = require('./db');
const SCHEMA = process.env.DB_SCHEMA;

module.exports = {
    getCategoryByName: async (name) => {
        try {
            const query = `
                SELECT *
                FROM ${SCHEMA}.category
                WHERE category_name = $1
            `;
            const category = await db.oneOrNone(query, [name]);
            return category;
        } catch (error) {
            throw error;
        }
    },
    getProductsInCategory: async (field, value) => {
        try {
            const query = `
                SELECT *
                FROM ${SCHEMA}.category
                WHERE ${field} = $1
            `;
            const category = await db.manyOrNone(query, [value]);
            const categoryId=category.category_id;
            const query2 = `
                SELECT pr.product_id as id,
                    pr.product_name as name,
                    pr.price as price,
                    pr.description as description,
                    pi.image_url as image_url
                FROM ${SCHEMA}.product pr
                LEFT JOIN ${SCHEMA}.product_image pi
                ON pr.product_id = pi.product_id
                WHERE category_id = $1
            `;
            const products = await db.manyOrNone(query2, [categoryId]);
            return products;
        } catch (error) {
            throw error;
        }
    },
};