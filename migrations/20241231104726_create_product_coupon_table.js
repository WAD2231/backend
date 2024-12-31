/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.raw(`
        CREATE TABLE IF NOT EXISTS product_coupon (
            product_id INT NOT NULL,
            coupon_id INT NOT NULL,
            PRIMARY KEY (product_id, coupon_id),
            CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES product(product_id) ON DELETE CASCADE,
            CONSTRAINT fk_coupon FOREIGN KEY (coupon_id) REFERENCES coupons(coupon_id) ON DELETE CASCADE
        )
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.raw(`
        DROP TABLE IF EXISTS product_coupon
    `);
};
