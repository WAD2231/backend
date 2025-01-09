const manufacturerM = require("../models/manufacturer.m");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('manufacturer').del()
  await knex('manufacturer').insert([
    {manufacturer_name: 'Logitech'},
    {manufacturer_name: 'Samsung'},
    {manufacturer_name: 'Sony'},
    {manufacturer_name: 'Apple'},
    {manufacturer_name: 'Asus'},
    {manufacturer_name: 'Lenovo'},
  ]);
};
