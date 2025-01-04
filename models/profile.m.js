const db = require('./db');
const SCHEMA = process.env.DB_SCHEMA;

module.exports = {
    getProfiles: async (page, size) => {
        try {
            const query = `
                SELECT 
                    p.profile_id as id,
                    p.name,
                    p.phone, 
                    p.address,
                    p.avatar,
                    json_object (
                        'id': u.user_id,
                        'username': u.username
                    ) as user
                FROM ${SCHEMA}.profile p 
                    JOIN ${SCHEMA}.users u 
                    ON p.user_id = u.user_id
                ORDER BY p.profile_id
                LIMIT $1 OFFSET $2
            `;
            const profiles = await db.any(query, [size, (page - 1) * size]);
            const totalItem = await db.one(`SELECT COUNT(*)::INTEGER as total FROM ${SCHEMA}.profile`);

            return {
                paging: {
                    current_page: page,
                    page_size: size,
                    total_item: totalItem.total,
                    total_page: Math.ceil(totalItem.total / size)
                },
                profiles: profiles
            }
        }
        catch (err) {
            throw err;
        }
    },

    getProfile: async (field, value) => {
        try {
            const query = `
                SELECT 
                    p.profile_id as id,
                    p.name,
                    p.phone, 
                    p.address,
                    p.avatar,
                    json_object (
                        'id': u.user_id,
                        'username': u.username
                    ) as user
                FROM ${SCHEMA}.profile p 
                    JOIN ${SCHEMA}.users u 
                    ON p.user_id = u.user_id
                WHERE ${field} = $1
            `;
            const profile = await db.oneOrNone(query, [value]);
            return profile;
        }
        catch (err) {
            throw err;
        }
    },

    createProfile: async (profile) => {
        try {
            const query = `
                INSERT INTO ${SCHEMA}.profile (name, phone, address, user_id, avatar)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING *
            `;
            const values = [profile.name, profile.phone, profile.address, profile.user_id, profile.avatar];
            const newProfile = await db.one(query, values);
            return newProfile;
        }
        catch (err) {
            throw err;
        }
    },

    updateProfile: async (id, profile) => {
        try {
            const query = `
                UPDATE ${SCHEMA}.profile
                SET name = $1, phone = $2, address = $3, avatar = $5
                WHERE profile_id = $4
            `;
            const values = [profile.name, profile.phone, profile.address, id, profile.avatar];
            await db.none(query, values);
        }
        catch (err) {
            throw err;
        }
    },

    deleteProfile: async (id) => {
        try {
            const query = `
                DELETE FROM ${SCHEMA}.profile
                WHERE profile_id = $1
            `;
            await db.none(query, [id]);
        }
        catch (err) {
            throw err;
        }
    },
};