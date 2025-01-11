/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.raw(`
        CREATE TABLE IF NOT EXISTS category (
            category_id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            thumbnail VARCHAR(255),
            description TEXT,
            super_category_id INT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT fk_super_category FOREIGN KEY (super_category_id) REFERENCES category(category_id) ON DELETE CASCADE
        )
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.raw(`
        DROP TABLE IF EXISTS category
    `);
};
