/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.raw(`
        DROP TABLE IF EXISTS attributes;
        
        CREATE TABLE IF NOT EXISTS attributes (
            attribute_id SERIAL PRIMARY KEY,
            attribute_name VARCHAR(255) NOT NULL,
            value VARCHAR(255) NOT NULL,
            product_id INT NOT NULL,
            CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES product(product_id) ON DELETE CASCADE
        )
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.raw(`
        DROP TABLE IF EXISTS attributes;
    `);
};
