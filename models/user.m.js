const db = require('./db');
const SCHEMA = process.env.DB_SCHEMA;
const LOCAL = process.env.PROVIDER_LOCAL;
const GOOGLE = process.env.PROVIDER_GOOGLE;
const FACEBOOK = process.env.PROVIDER_FACEBOOK;
const USER = process.env.PERMISSION_USER;
const ADMIN = process.env.PERMISSION_ADMIN;

module.exports = {
    getUser: async (field, value) => {
        try {
            const query = `
                SELECT *
                FROM ${SCHEMA}.users
                WHERE ${field} = $1
            `;

            const user = await db.oneOrNone(query, [value]);
            return user;
        }
        catch (error) {
            throw error;
        }
    },

    createUser: async (user) => {
        try {
            const query = `
                INSERT INTO ${SCHEMA}.users (username, password, email, permission, login_provider, account_id)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING user_id
            `;

            const values = [user.username, user.password, user.email, user.permission, LOCAL, user.account_id];
            const result = await db.one(query, values);
            return result.user_id;
        }
        catch (error) {
            throw error;
        }
    },

    findOrCreateUserByFacebook: async (profile) => {
        try {
            const query = `
                SELECT *
                FROM ${SCHEMA}.users
                WHERE login_provider = $1 AND provider_id = $2
            `;
            let user = await db.oneOrNone(query, [FACEBOOK, profile.id]);

            if (!user) {
                const query = `
                    INSERT INTO ${SCHEMA}.users (permission, login_provider, provider_id)
                    VALUES ($1, $2, $3)
                    RETURNING *
                `;

                user = await db.one(query, [USER, FACEBOOK, profile.id]);
            }

            return user;
        }
        catch (error) {
            throw error;
        }
    },

    findOrCreateUserByGoogle: async (profile) => {
        try {
            const query = `
                SELECT *
                FROM ${SCHEMA}.users
                WHERE login_provider = $1 AND provider_id = $2
            `;
            let user = await db.oneOrNone(query, [GOOGLE, profile.id]);

            if (!user) {
                const query = `
                    INSERT INTO ${SCHEMA}.users (permission, login_provider, provider_id)
                    VALUES ($1, $2, $3)
                    RETURNING *
                `;

                user = await db.one(query, [USER, GOOGLE, profile.id]);
            }

            return user;
        }
        catch (error) {
            throw error;
        }
    },

    getUsers: async () => {
        try {
            const query = `
                SELECT 
                    s.user_id as id, 
                    s.username, 
                    s.email, 
                    s.permission, 
                    s.provider_id, 
                    s.created_at,
                    CASE
                        WHEN s.login_provider = $1 THEN 'Local'
                        WHEN s.login_provider = $2 THEN 'Google'
                        WHEN s.login_provider = $3 THEN 'Facebook'
                    END AS login_provider,
                    json_build_object (
                        'id', p.profile_id,
                        'name', p.name,
                        'phone', p.phone,
                        'address', p.address
                    ) AS profile
                FROM ${SCHEMA}.users s 
                LEFT JOIN ${SCHEMA}.profile p 
                ON s.user_id = p.user_id
            `;
            const users = await db.manyOrNone(query, [LOCAL, GOOGLE, FACEBOOK]);
            return {
                total: users.length,
                users: users
            }
        }
        catch (error) {
            throw error;
        }
    },

    deleteUser: async (id) => {
        try {
            const query = `
                DELETE FROM ${SCHEMA}.users
                WHERE user_id = $1
            `;

            const result = await db.result(query, [id], r => r.rowCount);
            return result;
        }
        catch (error) {
            throw error;
        }
    },

    getUserDetail: async (id) => {
        try {
            const query = `
                SELECT 
                    s.user_id as id, 
                    s.username, 
                    s.email, 
                    s.permission, 
                    s.provider_id, 
                    s.created_at,
                    CASE
                        WHEN s.login_provider = $1 THEN 'Local'
                        WHEN s.login_provider = $2 THEN 'Google'
                        WHEN s.login_provider = $3 THEN 'Facebook'
                    END as login_provider,
                    json_object (
                        'id': p.profile_id,
                        'name': p.name,
                        'phone': p.phone,
                        'address': p.address
                    ) as profile
                FROM USERS s LEFT JOIN PROFILE p ON s.user_id = p.user_id
                WHERE s.user_id = $4
            `;
            const user = await db.oneOrNone(query, [LOCAL, GOOGLE, FACEBOOK, id]);
            return user;
        }
        catch (error) {
            throw error;
        }
    },

    updateUser: async (id, user) => {
        try {
            const query = `
                UPDATE ${SCHEMA}.users
                SET email = $1, password = $2
                WHERE user_id = $3
                RETURNING *
            `;

            const values = [user.email, user.password, id];
            const updatedUser = await db.one(query, values);
            return updatedUser;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    },

    updateAccountID: async (id, account_id) => {
        try {
            const query = `
                UPDATE ${SCHEMA}.users
                SET account_id = $1
                WHERE user_id = $2
                RETURNING *
            `;

            const values = [account_id, id];
            const updatedUser = await db.one(query, values);
            return updatedUser;
        }
        catch (error) {
            throw error;
        }
    },

    getAccountID: async(id) => {
        try {
            const query = `
                SELECT account_id
                FROM users 
                WHERE user_id = $1
            `;

            const result = await db.one(query, [id]);
            return result.account_id;
        }
        catch (err) {
            console.log(err)
            throw err;
        }
    }
};