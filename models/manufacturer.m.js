const db = require('./db');
const SCHEMA = process.env.DB_SCHEMA;

module.exports = {
    getManufacturerByName: async (name) => {
        try {
            const query = `
                SELECT *
                FROM ${SCHEMA}.manufacturer
                WHERE manufacturer_name = $1
            `;
            const manufacturer = await db.oneOrNone(query, [name]);
            return manufacturer;
        } catch (error) {
            throw error;
        }
    },
    // other methods...
};