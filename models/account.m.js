const db = require('./db');
const SCHEMA = process.env.DB_SCHEMA;

module.exports = {
    createAccount: async () => {
        try {
            const sql = `
                INSERT INTO ${SCHEMA}.accounts (balance)
                VALUES (0)
                RETURNING account_id;
            `;
            const result = await db.one(sql);
            return result.account_id;
        }
        catch (error) {
            throw error;
        }
    }
};