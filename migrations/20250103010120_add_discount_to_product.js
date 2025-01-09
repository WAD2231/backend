/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.alterTable('product', (table) => {
        table.decimal('discount', 5, 2).notNullable().defaultTo(0.00)
    });
    await knex.raw(`
        ALTER TABLE product
        ADD CONSTRAINT check_discount
        CHECK (discount >= 0 AND discount <= 100);
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.raw(`
        ALTER TABLE product
        DROP CONSTRAINT check_discount;
    `);
    
    await knex.schema.alterTable('product', (table) => {
        table.dropColumn('discount');
    });
};
