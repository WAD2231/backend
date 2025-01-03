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
    getCategories: async (filters) => {
        try {
            const { page_size, current_page } = filters;
            let query = `
                SELECT category_id as id, category_name as name
                FROM ${SCHEMA}.category
            `;
            const values = [];

            if (page_size) {
                const offset = (current_page - 1) * page_size;
                query += ` LIMIT $1 OFFSET $2`;
                values.push(page_size, offset);
            }

            const categories = await db.manyOrNone(query, values);

            if (!page_size) {
                return { categories };
            }

            const countQuery = `
                SELECT COUNT(*) as total
                FROM ${SCHEMA}.category
            `;
            const totalCountResult = await db.one(countQuery);
            const totalItems = parseInt(totalCountResult.total, 10);
            const totalPages = Math.ceil(totalItems / page_size);

            return {
                paging: {
                    total_page: totalPages,
                    total_item: totalItems,
                    current_page: current_page,
                    page_size: page_size
                },
                categories: categories
            };
        } catch (error) {
            throw error;
        }
    },
    getCategoryDetail: async (categoryId) => {
        try {
            const query = `
                SELECT *
                FROM ${SCHEMA}.category
                WHERE category_id = $1
            `;
            const category = await db.oneOrNone(query, [categoryId]);
            return category;
        } catch (error) {
            throw error;
        }
    },
    createCategory: async (category) => {
        try {
            const query = `
                INSERT INTO ${SCHEMA}.category (category_name, category_thumbnail, category_description)
                VALUES ($1)
                RETURNING category_id
            `;
            const values = [category.name, category.thumbnail, category.description];
            const result = await db.one(query, values);
            return result.category_id;
        } catch (error) {
            throw error;
        }
    },
    updateCategory: async (id, category) => {
        try {
            const query = `
                UPDATE ${SCHEMA}.category
                SET category_name = $1, category_thumbnail = $2, category_description = $3
                WHERE category_id = $4
                RETURNING category_id
            `;
            const values = [category.name, category.thumbnail, category.description, id];
            const result = await db.one(query, values);
            return result.category_id;
        } catch (error) {
            throw error;
        }
    },
    deleteCategory: async (id) => {
        try {
            const query = `
                DELETE FROM ${SCHEMA}.category
                WHERE category_id = $1
            `;
            await db.none(query, [id]);
        } catch (error) {
            throw error;
        }
    },
};