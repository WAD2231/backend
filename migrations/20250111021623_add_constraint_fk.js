/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.raw(`
        ALTER TABLE orders
        ADD CONSTRAINT fk_orders_users FOREIGN KEY (user_id) REFERENCES users(user_id);

        ALTER TABLE order_details
        ADD CONSTRAINT fk_details_product FOREIGN KEY (product_id) REFERENCES product(product_id);

        ALTER TABLE order_details
        ADD CONSTRAINT fk_details_orders FOREIGN KEY (order_id) REFERENCES orders(order_id);

        ALTER TABLE reviews
        ADD CONSTRAINT fk_reviews_product FOREIGN KEY (product_id) REFERENCES product(product_id);

        ALTER TABLE carts
        ADD CONSTRAINT pk_carts PRIMARY KEY (user_id, product_id);

        ALTER TABLE carts
        ADD CONSTRAINT fk_carts_users FOREIGN KEY (user_id) REFERENCES users(user_id);
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  
};
