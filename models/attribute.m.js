
const { up } = require('../migrations/20241230053431_create_manufacturer_table');
const { get } = require('../routers/user.r');
const db = require('./db');
const SCHEMA = process.env.DB_SCHEMA;

module.exports = {
    getAttributes: async () => {
        try {
            const query = `
                SELECT *
                FROM ${SCHEMA}.attributes
            `;
            const attributes = await db.manyOrNone(query);
            return attributes;
        } catch (error) {
            throw error;
        }
    },

    createAttribute: async (attribute) => {
        try {
            const query = `
                INSERT INTO ${SCHEMA}.attributes (attribute_name, attribute_value, cpu, ram, storage, battery, screen)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING attribute_id
            `;
            const values = [
                attribute.attribute_name,
                attribute.attribute_value,
                attribute.cpu,
                attribute.ram,
                attribute.storage,
                attribute.battery,
                attribute.screen
            ];
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
                SET attribute_name = $1, attribute_value = $2, cpu = $3, ram = $4, storage = $5, battery = $6, screen = $7
                WHERE attribute_id = $8
                RETURNING *
            `;
            const values = [
                attribute.attribute_name,
                attribute.attribute_value,
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

}