const db = require('./db');
const SCHEMA = process.env.DB_SCHEMA;

module.exports = {
    getCoupon: async (id) => {
        try {
            const query = `
                SELECT *
                FROM ${SCHEMA}.coupons
                WHERE coupon_id = $1
            `;
            const coupon = await db.oneOrNone(query, [id]);
            return coupon;
        } catch (error) {
            throw error;
        }
    },
    createCoupon: async (coupon) => {
        try {
            const query = `
                INSERT INTO ${SCHEMA}.coupons (created_at, expired_at, discount_percent, coupon_code)
                VALUES ($1, $2, $3, $4)
                RETURNING *
            `;
            const newCoupon = await db.one(query, [coupon.created_at, coupon.expired_at, coupon.discount_percent, coupon.coupon_code]);
            return newCoupon;
        } catch (error) {
            throw error;
        }
    },
    updateCoupon: async (id, coupon) => {
        try {
            const query = `
                UPDATE ${SCHEMA}.coupons
                SET created_at = $1, expired_at = $2, discount_percent = $3, coupon_code = $4
                WHERE coupon_id = $5
                RETURNING *
            `;
            const updatedCoupon = await db.one(query, [coupon.created_at, coupon.expired_at, coupon.discount_percent, coupon.coupon_code, id]);
            return updatedCoupon;
        } catch (error) {
            throw error;
        }
    },
    deleteCoupon: async (id) => {
        try {
            const query = `
                DELETE FROM ${SCHEMA}.coupons
                WHERE coupon_id = $1
            `;
            await db.none(query, [id]);
        } catch (error) {
            throw error;
        }
    },
};