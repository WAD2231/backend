const db = require('./db');
const SCHEMA = process.env.DB_SCHEMA;

module.exports = {
    createCart: async (userID) => {
        try {
            const query = `
                INSERT INTO ${SCHEMA}.carts (user_id) 
                VALUES ($1) RETURNING *
            `;
            const result = await db.one(query, [userID]);
            return result;
        }
        catch (err) {
            throw err;
        }
    },

    getCart: async (userID) => {
        try {
            const query = `
                SELECT *
                FROM ${SCHEMA}.carts 
                WHERE user_id = $1
            `;
            const result = await db.oneOrNone(query, [userID]);
            return result.cart_id;
        }
        catch (err) {
            throw err;
        }
    }
};