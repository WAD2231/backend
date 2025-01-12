/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.raw(`
        ALTER TABLE orders
        ADD CONSTRAINT fk_orders_users FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE;

        ALTER TABLE order_details
        ADD CONSTRAINT fk_details_product FOREIGN KEY (product_id) REFERENCES product(product_id) ON DELETE CASCADE;

        ALTER TABLE order_details
        ADD CONSTRAINT fk_details_orders FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE;

        ALTER TABLE reviews
        ADD CONSTRAINT fk_reviews_product FOREIGN KEY (product_id) REFERENCES product(product_id) ON DELETE CASCADE;

        ALTER TABLE carts
        ADD CONSTRAINT pk_carts PRIMARY KEY (user_id, product_id);

        ALTER TABLE carts
        ADD CONSTRAINT fk_carts_users FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE;

        ALTER TABLE product_image
        ADD CONSTRAINT fk_product_image_product FOREIGN KEY (product_id) REFERENCES product(product_id) ON DELETE CASCADE;
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.raw(`
        ALTER TABLE product_image DROP CONSTRAINT fk_product_image_product;
        ALTER TABLE carts DROP CONSTRAINT fk_carts_users;
        ALTER TABLE carts DROP CONSTRAINT pk_carts;
        ALTER TABLE reviews DROP CONSTRAINT fk_reviews_product;
        ALTER TABLE order_details DROP CONSTRAINT fk_details_orders;
        ALTER TABLE order_details DROP CONSTRAINT fk_details_product;
        ALTER TABLE orders DROP CONSTRAINT fk_orders_users;
    `); 
};
