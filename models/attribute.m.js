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
                INSERT INTO ${SCHEMA}.attributes (cpu, ram, storage, battery, screen)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING product_id
            `;
            const values = [
                attribute.cpu,
                attribute.ram,
                attribute.storage,
                attribute.battery,
                attribute.screen
            ];
            const result = await db.one(query, values);
            return result.product_id;
        } catch (error) {
            throw error;
        }
    },

    updateAttribute: async (id, attribute) => {
        try {
            const query = `
                UPDATE ${SCHEMA}.attributes
                SET cpu = $1, ram = $2, storage = $3, battery = $4, screen = $5
                WHERE product_id = $6
                RETURNING *
            `;
            const values = [
                attribute.cpu,
                attribute.ram,
                attribute.storage,
                attribute.battery,
                attribute.screen,
                id
            ];
            const result = await db.one(query, values);
            return result;
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