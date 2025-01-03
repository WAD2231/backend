const db = require('./db');
const SCHEMA = process.env.DB_SCHEMA;

module.exports = {
    getManufacturerByName: async (name) => {
        try {
            const query = `
                SELECT *
                FROM ${SCHEMA}.manufacturer
                WHERE manufacturer_name = $1
            `;
            const manufacturer = await db.oneOrNone(query, [name]);
            return manufacturer;
        } catch (error) {
            throw error;
        }
    },
    getManufacturers: async (filters) => {
        try {
            const { page_size, current_page } = filters;
            let query = `
                SELECT manufacturer_id as id, manufacturer_name as name
                FROM ${SCHEMA}.manufacturer
            `;
            const values = [];

            if (page_size) {
                const offset = (current_page - 1) * page_size;
                query += ` LIMIT $1 OFFSET $2`;
                values.push(page_size, offset);
            }

            const manufacturers = await db.manyOrNone(query, values);

            if (!page_size) {
                return { manufacturers };
            }

            const countQuery = `
                SELECT COUNT(*) as total
                FROM ${SCHEMA}.manufacturer
            `;
            const totalCountResult = await db.one(countQuery);
            const totalItems = parseInt(totalCountResult.total, 10);
            const totalPages = Math.ceil(totalItems / page_size);

            return {
                paging: {
                    total_page: totalPages,
                    total_item: totalItems,
                    current_page: current_page,
                    page_size: page_size
                },
                manufacturers: manufacturers
            };
        } catch (error) {
            throw error;
        }
    },
    getManufacturerById: async (manufacturerId) => {
        try {
            const query = `
                SELECT manufacturer_id, manufacturer_name
                FROM ${SCHEMA}.manufacturer
                WHERE manufacturer_id = $1
            `;
            const manufacturer = await db.oneOrNone(query, [manufacturerId]);
            return manufacturer;
        } catch (error) {
            throw error;
        }
    },
    createManufacturer: async (manufacturer) => {
        try {
            const query = `
                INSERT INTO ${SCHEMA}.manufacturer (manufacturer_name)
                VALUES ($1)
                RETURNING manufacturer_id
            `;
            const values = [manufacturer.name];
            const result = await db.one(query, values);
            return result.manufacturer_id;
        } catch (error) {
            throw error;
        }
    },
    updateManufacturer: async (id, manufacturer) => {
        try {
            const query = `
                UPDATE ${SCHEMA}.manufacturer
                SET manufacturer_name = $1
                WHERE manufacturer_id = $2
                RETURNING manufacturer_id
            `;
            const values = [manufacturer.name, id];
            const result = await db.one(query, values);
            return result.manufacturer_id;
        } catch (error) {
            throw error;
        }
    },
    deleteManufacturer: async (id) => {
        try {
            const query = `
                DELETE FROM ${SCHEMA}.manufacturer
                WHERE manufacturer_id = $1
            `;
            await db.none(query, [id]);
        } catch (error) {
            throw error;
        }
    }
};