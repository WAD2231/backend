
const { updateCoupon } = require('./coupon.m');
const db = require('./db');
const SCHEMA = process.env.DB_SCHEMA;

module.exports = {
    getProduct: async (field, value) => {
        try {
            const query = `
                SELECT pr.product_id as id,
                    pr.product_name as name,
                    pr.price as price,
                    pr.description as description,
                    pi.image_url as image_url
                FROM ${SCHEMA}.product pr
                LEFT JOIN ${SCHEMA}.product_image pi
                ON pr.product_id = pi.product_id
                WHERE ${field} = $1
            `;
            const products = await db.manyOrNone(query, [value]);
            return products;
        } catch (error) {
            throw error;
        }
    },
    getProducts: async () => {
        try {
            const query = `
                SELECT pr.product_id as id,
                    pr.product_name as name,
                    pr.price as price,
                    pr.description as description,
                    pi.image_url as image_url
                FROM ${SCHEMA}.product pr
                LEFT JOIN ${SCHEMA}.product_image pi
                ON pr.product_id = pi.product_id
            `;
            const products = await db.manyOrNone(query);
            return products;
        } catch (error) {
            throw error;
        }
    },
    getProductDetail: async (productId) => {
        try {
            const query = `
                SELECT pr.product_id as id,
                    pr.product_name as name,
                    pr.price as price,
                    pr.description as description,
                    pi.image_url as image_url,
                    m.manufacturer_name as manufacturer,
                    c.category_name as category
                FROM ${SCHEMA}.products pr
                LEFT JOIN ${SCHEMA}.product_image pi ON pr.product_id = pi.product_id
                LEFT JOIN ${SCHEMA}.manufacturer m ON pr.manufacturer_id = m.manufacturer_id
                LEFT JOIN ${SCHEMA}.category c ON pr.category_id = c.category_id
                WHERE pr.product_id = $1
            `;
            const product = await db.oneOrNone(query, [productId]);
            return product;
        } catch (error) {
            throw error;
        }
    },
    createProduct: async (product) => {
        try {
            const query = `
                INSERT INTO ${SCHEMA}.product (product_name, price, description)
                VALUES ($1, $2, $3)
                RETURNING product_id
            `;
            const values = [product.name, product.price, product.description];
            const result = await db.one(query, values);

            if (product.image_url) {
                const imageQuery = `
                    INSERT INTO ${SCHEMA}.product_image (product_id, image_url)
                    VALUES ($1, $2)
                `;
                await db.none(imageQuery, [result.product_id, product.image_url]);
            }

            return result.product_id;
        } catch (error) {
            throw error;
        }
    },
    updateProduct: async (id, product) => {
        try {
            const query = `
                UPDATE ${SCHEMA}.product
                SET product_name = $1, price = $2, description = $3
                WHERE product_id = $4
                RETURNING *
            `;
            const values = [product.name, product.price, product.description, id];
            const result = await db.one(query, values);

            if (product.image_url) {
                const imageQuery = `
                    INSERT INTO ${SCHEMA}.product_image (product_id, image_url)
                    VALUES ($1, $2)
                    ON CONFLICT (product_id) DO UPDATE
                    SET image_url = EXCLUDED.image_url
                `;
                await db.none(imageQuery, [id, product.image_url]);
            }

            return result;
        } catch (error) {
            throw error;
        }
    },
    deleteProduct: async (id) => {
        try {
            const query = `
                DELETE FROM ${SCHEMA}.product
                WHERE product_id = $1
            `;
            await db.none(query, [id]);

            const imageQuery = `
                DELETE FROM ${SCHEMA}.product_image
                WHERE product_id = $1
            `;
            await db.none(imageQuery, [id]);
        } catch (error) {
            throw error;
        }
    },
    addCouponProduct: async (productId, couponId) => {
        try {
            const query = `
                INSERT INTO ${SCHEMA}.coupon_product (product_id, coupon_id)
                VALUES ($1, $2)
            `;
            await db.none(query, [productId, couponId]);
        } catch (error) {
            throw error;
        }
    },
    getProductsWithCoupon: async () => {
        try {
            const query = `
                SELECT pr.product_id as id,
                    pr.product_name as name,
                    pr.price as price,
                    pr.description as description,
                    pi.image_url as image_url,
                    cp.coupon_code as coupon_code,
                    c.expired_at as coupon_expired_at
                FROM ${SCHEMA}.products pr
                LEFT JOIN ${SCHEMA}.product_image pi ON pr.product_id = pi.product_id
                LEFT JOIN ${SCHEMA}.coupon_product cp ON pr.product_id = cp.product_id
                LEFT JOIN ${SCHEMA}.coupons c ON cp.coupon_id = c.coupon_id
                WHERE c.expired_at > NOW()
            `;
            const products = await db.manyOrNone(query);
            return products;
        } catch (error) {
            throw error;
        }
    },
    updateCouponProduct: async (productId, couponId) => {
        try {
            const query = `
                UPDATE ${SCHEMA}.coupon_product
                SET coupon_id = $2
                WHERE product_id = $1
            `;
            await db.none(query, [productId, couponId]);
        } catch (error) {
            throw error;
        }
    },
    deleteCouponProduct: async (productId, couponId) => {
        try {
            const query = `
                DELETE FROM ${SCHEMA}.coupon_product
                WHERE product_id = $1
                AND coupon_id = $2
            `;
            await db.none(query, [productId, couponId]);
        } catch (error) {
            throw error;
        }
    }
}