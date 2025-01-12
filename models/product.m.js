
const { fi } = require('@faker-js/faker');
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
    getProductsForHome: async (filters) => {
        try {
            const { page_size, current_page } = filters;
            const offset = (current_page - 1) * page_size;
    
            // Query for new products
            const newProductsQuery = `
                SELECT pr.product_id as id,
                    pr.product_name as name,
                    pr.price as price,
                    pr.description as description,
                    pr.stock as stock,
                    pr.discount as discount,
                    pr.created_at as created_at,
                    c.name as category,
                    c.category_id as category_id,
                    m.manufacturer_name as manufacturer,
                    m.manufacturer_id as manufacturer_id,
                    pr.tag as tag,
                    COALESCE(
                        json_agg(
                            json_build_object('image_url', pi.image_url)
                        ) FILTER (WHERE pi.image_url IS NOT NULL), '[]'
                    ) as images
                FROM ${SCHEMA}.product pr
                LEFT JOIN ${SCHEMA}.product_image pi ON pr.product_id = pi.product_id
                LEFT JOIN ${SCHEMA}.category c ON pr.category_id = c.category_id
                LEFT JOIN ${SCHEMA}.manufacturer m ON pr.manufacturer_id = m.manufacturer_id
                WHERE pr.tag = 'new'
                GROUP BY pr.product_id, c.name, m.manufacturer_name, c.category_id, m.manufacturer_id
                ORDER BY pr.created_at DESC
                LIMIT $1 OFFSET $2
            `;
            const newProducts = await db.manyOrNone(newProductsQuery, [page_size, offset]);
    
            // Query for best-selling products
            const bestSellingProductsQuery = `
            WITH top_products AS (
                SELECT pr.product_id
                FROM ${SCHEMA}.product pr
                LEFT JOIN ${SCHEMA}.order_details od ON pr.product_id = od.product_id
                GROUP BY pr.product_id
                ORDER BY COUNT(od.product_id) DESC
                LIMIT $1 OFFSET $2
            )
            SELECT pr.product_id as id,
                pr.product_name as name,
                pr.price as price,
                pr.description as description,
                pr.stock as stock,
                pr.discount as discount,
                pr.created_at as created_at,
                c.name as category,
                c.category_id as category_id,
                m.manufacturer_name as manufacturer,
                m.manufacturer_id as manufacturer_id,
                pr.tag as tag,
                COALESCE(
                    json_agg(
                        json_build_object('image_url', pi.image_url)
                    ) FILTER (WHERE pi.image_url IS NOT NULL), '[]'
                ) as images
            FROM ${SCHEMA}.product pr
            LEFT JOIN ${SCHEMA}.product_image pi ON pr.product_id = pi.product_id
            LEFT JOIN ${SCHEMA}.category c ON pr.category_id = c.category_id
            LEFT JOIN ${SCHEMA}.manufacturer m ON pr.manufacturer_id = m.manufacturer_id
            WHERE pr.product_id IN (SELECT product_id FROM top_products)
            GROUP BY pr.product_id, c.name, m.manufacturer_name, c.category_id, m.manufacturer_id
        `;
            const bestSellingProducts = await db.manyOrNone(bestSellingProductsQuery, [page_size, offset]);
    
            // Query for highest discount products
            const highestDiscountProductsQuery = `
                SELECT pr.product_id as id,
                    pr.product_name as name,
                    pr.price as price,
                    pr.description as description,
                    pr.stock as stock,
                    pr.discount as discount,
                    pr.created_at as created_at,
                    c.name as category,
                    c.category_id as category_id,
                    m.manufacturer_name as manufacturer,
                    m.manufacturer_id as manufacturer_id,
                    pr.tag as tag,
                    COALESCE(
                        json_agg(
                            json_build_object('image_url', pi.image_url)
                        ) FILTER (WHERE pi.image_url IS NOT NULL), '[]'
                    ) as images
                FROM ${SCHEMA}.product pr
                LEFT JOIN ${SCHEMA}.product_image pi ON pr.product_id = pi.product_id
                LEFT JOIN ${SCHEMA}.category c ON pr.category_id = c.category_id
                LEFT JOIN ${SCHEMA}.manufacturer m ON pr.manufacturer_id = m.manufacturer_id
                WHERE pr.discount > 0
                GROUP BY pr.product_id, c.name, m.manufacturer_name, c.category_id, m.manufacturer_id
                ORDER BY pr.discount DESC
                LIMIT $1 OFFSET $2
            `;
            const highestDiscountProducts = await db.manyOrNone(highestDiscountProductsQuery, [page_size, offset]);
    
            return {
                newProducts,
                bestSellingProducts,
                highestDiscountProducts
            };
        } catch (error) {
            throw error;
        }
    },
    getProducts: async (filters) => {
        try {
            const { category_id, tag, price_min, price_max, search, page_size, current_page, exclude_product_id } = filters;

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
                    c.category_id as category_id,
                    m.manufacturer_name as manufacturer,
                    m.manufacturer_id as manufacturer_id,
                    pr.tag as tag,
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

            if (tag) {
                query += ` AND pr.tag = $${index++}`;
                values.push(tag);
            }

            if (price_min) {
                query += ` AND pr.price >= $${index++}`;
                values.push(price_min);
            }

            if (price_max) {
                query += ` AND pr.price <= $${index++}`;
                values.push(price_max);
            }

            if (search) {
                query += ` AND pr.product_name ILIKE $${index++}`;
                values.push(`%${search}%`);
            }

            if (exclude_product_id) {
                query += ` AND pr.product_id != $${index++}`;
                values.push(exclude_product_id);
            }

            query += ` GROUP BY pr.product_id, c.name, m.manufacturer_name, c.category_id, m.manufacturer_id ORDER BY pr.product_id LIMIT $${index++} OFFSET $${index}`;
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

            if (tag) {
                countQuery += ` AND pr.tag = $${countIndex++}`;
                countValues.push(tag);
            }

            if (price_min) {
                countQuery += ` AND pr.price >= $${countIndex++}`;
                countValues.push(price_min);
            }

            if (price_max) {
                countQuery += ` AND pr.price <= $${countIndex++}`;
                countValues.push(price_max);
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
                    category_id: category_id,
                    tag: tag,
                    price_min: price_min,
                    price_max: price_max
                },
                products: products
            };
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
                    pr.stock as stock,
                    pr.discount as discount,
                    pr.created_at as created_at,
                    c.name as category,
                    m.manufacturer_name as manufacturer,
                    c.category_id as category_id,
                    m.manufacturer_id as manufacturer_id,
                    pr.tag as tag,
                    COALESCE(
                        json_agg(
                            json_build_object('image_url', pi.image_url)
                        ) FILTER (WHERE pi.image_url IS NOT NULL), '[]'
                    ) as images
                FROM ${SCHEMA}.product pr
                LEFT JOIN ${SCHEMA}.product_image pi ON pr.product_id = pi.product_id
                LEFT JOIN ${SCHEMA}.category c ON pr.category_id = c.category_id
                LEFT JOIN ${SCHEMA}.manufacturer m ON pr.manufacturer_id = m.manufacturer_id
                WHERE pr.product_id = $1
                GROUP BY pr.product_id, c.name, m.manufacturer_name, c.category_id, m.manufacturer_id
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
                INSERT INTO ${SCHEMA}.product (product_name, price, description, stock, discount, category_id, manufacturer_id, tag)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING *
            `;
            const values = [product.name, product.price, product.description, product.stock, product.discount, product.category_id, product.manufacturer_id, product.tag];
            const result = await db.one(query, values);

            if (product.images && product.images.length > 0) {
                const imageQuery = `
                    INSERT INTO ${SCHEMA}.product_image (product_id, image_url)
                    VALUES ($1, $2)
                `;
                for (const image_url of product.images) {
                    await db.none(imageQuery, [result.product_id, image_url]);
                }
            }

            return result;
        } catch (error) {
            throw error;
        }
    },
    updateProduct: async (id, product) => {
        try {
            const query = `
                UPDATE ${SCHEMA}.product
                SET product_name = $1, price = $2, description = $3, stock = $4, discount = $5, category_id = $6, manufacturer_id = $7, tag = $8
                WHERE product_id = $9
                RETURNING *
            `;
            const values = [product.name, product.price, product.description, product.stock, product.discount, product.category_id, product.manufacturer_id, product.tag, id];
            const result = await db.one(query, values);

            const deleteImageQuery = `
                DELETE FROM ${SCHEMA}.product_image WHERE product_id = $1
            `

            await db.none(deleteImageQuery, [id]);

            if (product.image_url) {
                const imageQuery = `
                    INSERT INTO ${SCHEMA}.product_image (product_id, image_url)
                    VALUES ($1, $2)
                `;
                for (const image_url of product.image_url) {
                    await db.none(imageQuery, [id, image_url]);
                }
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
                    COALESCE(
                        json_agg(
                            json_build_object('image_url', pi.image_url)
                        ) FILTER (WHERE pi.image_url IS NOT NULL), '[]'
                    ) as images
                FROM ${SCHEMA}.product pr
                LEFT JOIN ${SCHEMA}.product_image pi ON pr.product_id = pi.product_id
                WHERE pr.category_id = (SELECT category_id FROM ${SCHEMA}.product WHERE product_id = $1)
                    AND pr.type = (SELECT type FROM ${SCHEMA}.product WHERE product_id = $1)
                    AND pr.product_id != $1
                GROUP BY pr.product_id
            `;
            const products = await db.manyOrNone(query, [productId]);
            return products;
        } catch (error) {
            throw error;
        }
    },

    statisticProductByCategory: async () => {
        try {
            const query = `
                SELECT
                    c.category_id as id,
                    c.name as name,
                    SUM(p.stock)::INTEGER as quantity
                FROM ${SCHEMA}.product p 
                JOIN ${SCHEMA}.category c ON p.category_id = c.category_id
                GROUP BY c.category_id, c.name
                ORDER BY quantity DESC
            `;
            const result = await db.any(query);
            return result;
        } catch (error) {
            throw error;
        }
    },

    statisticProductByManufacturer: async () => {
        try {
            const query = `
                SELECT
                    m.manufacturer_id as id,
                    m.manufacturer_name as name,
                    SUM(p.stock)::INTEGER as quantity
                FROM ${SCHEMA}.product p 
                JOIN ${SCHEMA}.manufacturer m ON p.manufacturer_id = m.manufacturer_id
                GROUP BY m.manufacturer_id, m.manufacturer_name
                ORDER BY quantity DESC
            `;
            const result = await db.any(query);
            return result;
        } catch (error) {
            throw error;
        }
    }
};