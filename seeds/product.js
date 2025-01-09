/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('product').del()
  await knex('product').insert([
    {
      product_name: 'Logitech MK270 Wireless Keyboard And Mouse Combo',
      price: 27.99,
      stock: 100,
      description: 'Logitech MK270 Wireless Keyboard And Mouse Combo For Windows, 2.4 GHz Wireless, Compact Mouse, 8 Multimedia And Shortcut Keys, For PC, Laptop - Black',
      category_id: 6,
      manufacturer_id: 1,
      discount: 0,
      type: 'keyboard',
    },
    {
      product_name: 'NPET K10V3PRO Gaming Keyboard',
      description: 'NPET K10V3PRO Gaming Keyboard, RGB Backlit Keys, Spill-Resistant, Customizable Keys, Dedicated Multi-Media Keys – Black',
      price: 12.49,
      stock:90,
      category_id: 6,
      manufacturer_id: 2,
      discount: 0,
      type: 'keyboard',
    },
    {
      product_name: 'SteelSeries Arctis Nova 1 Multi-System Gaming Headset',
      description: 'SteelSeries Arctis Nova 1 Multi-System Gaming Headset — Hi-Fi Drivers — 360° Spatial Audio — Comfort Design — Durable — Ultra Lightweight — Noise-Cancelling Mic — PC, PS5/PS4, Switch, Xbox - Black',
      price: 59.99,
      stock: 80,
      category_id: 1,
      manufacturer_id: 3,
      discount: 0,
      type: 'headset',
    }
    

  ]);
};
