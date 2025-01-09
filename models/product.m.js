
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
    getProducts: async (filters) => {
        try {
            const { category_id, search, page_size, current_page, exclude_product_id } = filters;

            const offset = (current_page - 1) * page_size;
    
            let query = `
                SELECT pr.product_id as id,
                       pr.product_name as name,
                       pr.price as price,
                       pr.description as description,
                       pr.stock as stock,
                       pr.discount as discount,
                       pr.created_at as created_at,
                       c.name as category,
                       m.manufacturer_name as manufacturer,
                       COALESCE(
                           json_agg(
                               json_build_object('image_url', pi.image_url)
                           ) FILTER (WHERE pi.image_url IS NOT NULL), '[]'
                       ) as images
                FROM ${SCHEMA}.product pr
                LEFT JOIN ${SCHEMA}.product_image pi ON pr.product_id = pi.product_id
                LEFT JOIN ${SCHEMA}.category c ON pr.category_id = c.category_id
                LEFT JOIN ${SCHEMA}.manufacturer m ON pr.manufacturer_id = m.manufacturer_id
                WHERE 1=1
            `;
    
            const values = [];
            let index = 1;
    
            if (category_id) {
                query += ` AND pr.category_id = $${index++}`;
                values.push(category_id);
            }
    
            if (search) {
                query += ` AND pr.product_name ILIKE $${index++}`;
                values.push(`%${search}%`);
            }
    
            if (exclude_product_id) {
                query += ` AND pr.product_id != $${index++}`;
                values.push(exclude_product_id);
            }
    
            query += `
                GROUP BY pr.product_id, c.name, m.manufacturer_name
                LIMIT $${index++} OFFSET $${index}`;
            values.push(page_size, offset);
    
            const products = await db.manyOrNone(query, values);
    
            // Get total count for pagination
            let countQuery = `
                SELECT COUNT(*) as total
                FROM ${SCHEMA}.product pr
                WHERE 1=1
            `;
    
            const countValues = [];
            let countIndex = 1;
    
            if (category_id) {
                countQuery += ` AND pr.category_id = $${countIndex++}`;
                countValues.push(category_id);
            }
    
            if (search) {
                countQuery += ` AND pr.product_name ILIKE $${countIndex++}`;
                countValues.push(`%${search}%`);
            }
    
            if (exclude_product_id) {
                countQuery += ` AND pr.product_id != $${countIndex++}`;
                countValues.push(exclude_product_id);
            }
    
            const totalCountResult = await db.one(countQuery, countValues);
            const totalItems = parseInt(totalCountResult.total, 10);
            const totalPages = Math.ceil(totalItems / page_size);
    
            return {
                paging: {
                    total_page: totalPages,
                    total_item: totalItems,
                    current_page: current_page,
                    page_size: page_size
                },
                query: {
                    search: search,
                    category_id: category_id
                },
                products: products
            };
        } catch (error) {
            throw error;
        }
    }
    ,
    getProductDetail: async (productId) => {
        try {
            const query = `
                SELECT pr.product_id as id,
                    pr.product_name as name,
                    pr.price as price,
                    pr.description as description,
                    pr.created_at as created_at,
                    pi.image_url as image_url,
                    m.manufacturer_name as manufacturer,
                    c.name as category
                FROM ${SCHEMA}.product pr
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
                INSERT INTO ${SCHEMA}.product (product_name, price, description, stock, discount, category_id, manufacturer_id)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING product_id
            `;
            const values = [product.name, product.price, product.description, product.stock, product.discount, product.category_id, product.manufacturer_id];
            const result = await db.one(query, values);

            if (product.image_urls && product.image_urls.length > 0) {
                const imageQuery = `
                    INSERT INTO ${SCHEMA}.product_image (product_id, image_url)
                    VALUES ($1, $2)
                `;
                for (const image_url of product.image_urls) {
                    await db.none(imageQuery, [result.product_id, image_url]);
                }
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
    getSameTypeProductInCategory: async (productId) => {
        try {
            const query = `
                SELECT pr.product_id as id,
                    pr.product_name as name,
                    pr.price as price,
                    pr.description as description,
                    pi.image_url as image_url
                FROM ${SCHEMA}.product pr
                LEFT JOIN ${SCHEMA}.product_image pi ON pr.product_id = pi.product_id
                WHERE pr.category_id = (SELECT category_id FROM ${SCHEMA}.product WHERE product_id = $1) AND
                pr.type = (SELECT type FROM ${SCHEMA}.product WHERE product_id = $1)
                AND pr.product_id != $1
            `;
            const products = await db.manyOrNone(query, [productId]);
            return products;
        } catch (error) {
            throw error;
        }
    }
};