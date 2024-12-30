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
    
};