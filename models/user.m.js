const db = require('./db');
const SCHEMA = process.env.DB_SCHEMA;
const LOCAL = process.env.PROVIDER_LOCAL;
const GOOGLE = process.env.PROVIDER_GOOGLE;
const FACEBOOK = process.env.PROVIDER_FACEBOOK;
const USER = process.env.PERMISSION_USER;
const ADMIN = process.env.PERMISSION_ADMIN;

module.exports = {
    getUser: async (id) => {
        try {
            const query = `
                SELECT *
                FROM ${SCHEMA}.users
                WHERE user_id = $1
            `;

            const user = await db.oneOrNone(query, [id]);
            return user;
        }
        catch (error) {
            throw error;
        }
    },

    getUserByUsername: async (username) => {
        try {
            const query = `
                SELECT *
                FROM ${SCHEMA}.users
                WHERE username = $1
            `;

            const user = await db.oneOrNone(query, [username]);
            return user;
        }
        catch (error) {
            throw error;
        }
    },

    getUserByEmail: async (email) => {
        try {
            const query = `
                SELECT *
                FROM ${SCHEMA}.users
                WHERE email = $1
            `;

            const user = await db.oneOrNone(query, [email]);
            return user;
        }
        catch (error) {
            throw error;
        }
    },

    createUser: async (user) => {
        try {
            const query = `
                INSERT INTO ${SCHEMA}.users (username, password, email, permission, login_provider, wallet_id)
                VALUES ($1, $2, $3, 1, $4, $5)
                RETURNING user_id
            `;

            const values = [user.username, user.password, user.email, LOCAL, user.wallet_id];
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

    updatePassword: async (id, password) => {
        try {
            const query = `
                UPDATE ${SCHEMA}.users
                SET password = $1
                WHERE user_id = $2
            `;

            await db.none(query, [password, id]);
        }
        catch (error) {
            throw error;
        }
    },
};