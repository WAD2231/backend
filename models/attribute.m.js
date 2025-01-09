const db = require('./db');
const SCHEMA = process.env.DB_SCHEMA;

module.exports = {
    getAttributes: async (productId) => {
        try {
            const query = `
                SELECT *
                FROM ${SCHEMA}.attributes
                WHERE product_id = $1
            `;
            const attributes = await db.manyOrNone(query, [productId]);
            return attributes;
        } catch (error) {
            throw error;
        }
    },

    createAttribute: async (attribute) => {
        try {
            const query = `
                INSERT INTO ${SCHEMA}.attributes (attribute_name, value, product_id)
                VALUES ($1, $2, $3)
                RETURNING attribute_id
            `;
            const values = [attribute.attribute_name, attribute.value, attribute.product_id];
            const result = await db.one(query, values);
            return result.attribute_id;
        } catch (error) {
            throw error;
        }
    },

    updateAttribute: async (id, attribute) => {
        try {
            const query = `
                UPDATE ${SCHEMA}.attributes
                SET attribute_name = $1, value = $2
                WHERE attribute_id = $3
            `;
            const values = [attribute.attribute_name, attribute.value, id];
            await db.none(query, values);
        } catch (error) {
            throw error;
        }
    },

    deleteAttribute: async (id) => {
        try {
            const query = `
                DELETE FROM ${SCHEMA}.attributes
                WHERE product_id = $1
            `;
            await db.none(query, [id]);
        } catch (error) {
            throw error;
        }
    }
};