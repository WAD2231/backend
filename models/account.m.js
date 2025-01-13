const db = require('./db');
const SCHEMA = process.env.DB_SCHEMA;

const init = async () => {
    try {
        const accountCount = await db.one(`
            SELECT COUNT(*) AS count
            FROM ${SCHEMA}.accounts    
        `);

        if (accountCount.count > 0) {
            return;
        }

        await db.none(`
            INSERT INTO ${SCHEMA}.accounts (balance)
            VALUES (0)
        `);
    }
    catch (error) {
        throw error;
    }
};

init();

module.exports = {
    createAccount: async () => {
        try {
            const sql = `
                INSERT INTO ${SCHEMA}.accounts (balance)
                VALUES (1000000)
                RETURNING account_id;
            `;
            const result = await db.one(sql);
            return result.account_id;
        }
        catch (error) {
            throw error;
        }
    },

    getBalance: async (id) => {
        try {
            const sql = `
                SELECT balance
                FROM ${SCHEMA}.accounts
                WHERE account_id = $1
            `;
            const result = await db.one(sql, [id]);
            return result.balance;
        }
        catch (error) {
            throw error;
        }
    }
};