/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.alterTable('product', (table) => {
        table.string('type', 50).notNullable().defaultTo('general'); // Thêm cột `type`
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.alterTable('product', (table) => {
        table.dropColumn('type'); // Xóa cột `type`
    });
};
