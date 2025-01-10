const db = require('./db');
const SCHEMA = process.env.DB_SCHEMA;
const LOCAL = process.env.PROVIDER_LOCAL;
const GOOGLE = process.env.PROVIDER_GOOGLE;
const FACEBOOK = process.env.PROVIDER_FACEBOOK;
const USER = process.env.PERMISSION_USER;
const ADMIN = process.env.PERMISSION_ADMIN;
const bcrypt = require('bcrypt');

const init = async () => {
    const userCount = await db.one(`
        SELECT COUNT(*)::INTEGER as total
        FROM ${SCHEMA}.users    
    `);
    
    if (userCount.total != 0) {
        return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt);

    await db.none(`
        INSERT INTO ${SCHEMA}.users (
            username, 
            password, 
            permission, 
            fullname,
            login_provider,
            account_id
        )
        VALUES ($1, $2, $3, $4, $5, 1)
    `, [
        process.env.ADMIN_USERNAME,
        hashedPassword,
        ADMIN,
        'Admin',
        LOCAL
    ]);
}

init();

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
                INSERT INTO ${SCHEMA}.users (
                    username, 
                    password, 
                    permission, 
                    account_id,
                    fullname,
                    login_provider
                )
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING user_id
            `;

            const result = await db.one(query, [
                user.username,
                user.password,
                user.permission,
                user.account_id,
                user.fullname,
                LOCAL
            ]);
            
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
                WHERE login_provider = $1 
                AND provider_id = $2
            `;
            let user = await db.oneOrNone(query, [FACEBOOK, profile.id]);

            if (!user) {
                const query = `
                    INSERT INTO ${SCHEMA}.users (
                        permission, 
                        login_provider, 
                        provider_id,
                        fullname,
                        avatar 
                    )
                    VALUES ($1, $2, $3, $4, $5)
                    RETURNING *
                `;

                user = await db.one(query, [
                    USER, 
                    FACEBOOK, 
                    profile.id, 
                    profile.fullname, 
                    profile.avatar
                ]);
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
                WHERE login_provider = $1 
                AND provider_id = $2
            `;
            let user = await db.oneOrNone(query, [GOOGLE, profile.id]);
            if (!user) {
                const query = `
                    INSERT INTO ${SCHEMA}.users (
                        permission, 
                        login_provider, 
                        provider_id,
                        fullname,
                        avatar
                    )
                    VALUES ($1, $2, $3, $4, $5)
                    RETURNING *
                `;

                user = await db.one(query, [
                    USER, 
                    GOOGLE, 
                    profile.id, 
                    profile.fullname,
                    profile.avatar
                ]);
            }

            return user;
        }
        catch (error) {
            throw error;
        }
    },

    getUsers: async (page, size) => {
        try {
            const query = `
                WITH total_users AS (
                    SELECT COUNT(*) AS total_item
                    FROM ${SCHEMA}.users
                ),
                user_details AS (
                    SELECT 
                        user_id, 
                        username, 
                        permission, 
                        provider_id, 
                        created_at,
                        CASE
                            WHEN login_provider = $1 THEN 'Local'
                            WHEN login_provider = $2 THEN 'Google'
                            WHEN login_provider = $3 THEN 'Facebook'
                        END AS login_provider,
                        fullname,
                        avatar,
                        phone,
                        address
                    FROM ${SCHEMA}.users
                    LIMIT $4
                    OFFSET $5
                )
                SELECT 
                    (SELECT json_object('total_item': total_item) FROM total_users) AS paging,
                    json_agg(user_details) AS users
                FROM user_details;
            `;
            const data = await db.one(query, [
                LOCAL, 
                GOOGLE, 
                FACEBOOK,
                size,
                (page - 1) * size
            ]);

            return {
                paging: {
                    total_page: Math.ceil(data.paging.total_item / size),
                    total_item: data.paging.total_item,
                    page_size: size,
                    current_page: page,
                },
                users: data.users
            }
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    },

    deleteUser: async (id) => {
        try {
            const query = `
                DELETE FROM ${SCHEMA}.users
                WHERE user_id = $1
                RETURNING *
            `;

            const result = await db.any(query, [id]);
            return result.length;
        }
        catch (error) {
            throw error;
        }
    },


    getUserDetail: async (id) => {
        try {
            const query = `
                SELECT 
                    user_id, 
                    username, 
                    permission, 
                    provider_id, 
                    created_at,
                    CASE
                        WHEN login_provider = $1 THEN 'Local'
                        WHEN login_provider = $2 THEN 'Google'
                        WHEN login_provider = $3 THEN 'Facebook'
                    END as login_provider,
                    fullname,
                    avatar,
                    phone,
                    address
                FROM USERS
                WHERE user_id = $4
            `;
            const user = await db.oneOrNone(query, [LOCAL, GOOGLE, FACEBOOK, id]);
            return user;
        }
        catch (error) {
            throw error;
        }
    },

    resetPassword: async (id, password) => {
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

    updateAccountID: async (id, account_id) => {
        try {
            const query = `
                UPDATE ${SCHEMA}.users
                SET account_id = $1
                WHERE user_id = $2
                RETURNING *
            `;

            const values = [account_id, id];
            const updatedUser = await db.any(query, values);
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
    },

    getUserCount: async () => {
        try {
            const query = `
                SELECT 
                    EXTRACT(MONTH FROM created_at)::INTEGER AS month, 
                    EXTRACT(YEAR FROM created_at)::INTEGER AS year, 
                    COUNT(*)::INTEGER AS quantity
                FROM ${SCHEMA}.users
                GROUP BY 
                    EXTRACT(MONTH FROM created_at), 
                    EXTRACT(YEAR FROM created_at)
                ORDER BY 
                    year, month
                LIMIT 12
            `;

            const result = await db.any(query);
            return result;
        }
        catch (error) {
            throw error;
        }
    },

    updateUser: async (id, user) => {
        try {
            const query = `
                UPDATE ${SCHEMA}.users
                SET 
                    fullname = $1,
                    phone = $2,
                    address = $3,
                    avatar = CASE WHEN $4 IS NOT NULL THEN $4 ELSE avatar END
                WHERE user_id = $5
                RETURNING *
            `;

            const result = await db.oneOrNone(query, [user.fullname, user.phone, user.address, user.avatar, id]);
            return result.length;
        }
        catch (error) {
            throw error;
        }
    },
};