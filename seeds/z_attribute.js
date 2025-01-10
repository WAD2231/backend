/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('attributes').del()
  await knex('attributes').insert([
    { attribute_name: 'Connectivity', value: 'Wired', product_id: 1 },
    { attribute_name: 'Key Switch Type', value: 'Mechanical (Cherry MX Red)', product_id: 1 },
    { attribute_name: 'Backlight', value: 'RGB', product_id: 1 },
    { attribute_name: 'Layout', value: 'Full-size', product_id: 1 },
    { attribute_name: 'Compatibility', value: 'Windows', product_id: 1 },

    { attribute_name: 'Connectivity', value: 'Wireless', product_id: 2 },
    { attribute_name: 'Key Switch Type', value: 'Membrane', product_id: 2 },
    { attribute_name: 'Backlight', value: 'Single Color', product_id: 2 },
    { attribute_name: 'Layout', value: 'Tenkeyless (TKL)', product_id: 2 },
    { attribute_name: 'Compatibility', value: 'Windows / macOS', product_id: 2 },

    { attribute_name: 'Connectivity', value: 'Wired', product_id: 4 },
    { attribute_name: 'Key Switch Type', value: 'Mechanical (Cherry MX Blue)', product_id: 4 },
    { attribute_name: 'Backlight', value: 'RGB', product_id: 4 },
    { attribute_name: 'Layout', value: '75%', product_id: 4 },
    { attribute_name: 'Compatibility', value: 'Windows / Linux', product_id: 4 },

    { attribute_name: 'Connectivity', value: 'Wireless', product_id: 5 },
    { attribute_name: 'Key Switch Type', value: 'Membrane', product_id: 5 },
    { attribute_name: 'Backlight', value: 'None', product_id: 5 },
    { attribute_name: 'Layout', value: 'Full-size', product_id: 5 },
    { attribute_name: 'Compatibility', value: 'Windows', product_id: 5 },

    { attribute_name: 'Connectivity', value: 'Bluetooth 5.0', product_id: 6 },
    { attribute_name: 'Key Switch Type', value: 'Optical', product_id: 6 },
    { attribute_name: 'Backlight', value: 'Single Color', product_id: 6 },
    { attribute_name: 'Layout', value: 'Tenkeyless (TKL)', product_id: 6 },
    { attribute_name: 'Compatibility', value: 'Windows / macOS', product_id: 6 },

    { attribute_name: 'Connectivity', value: 'Wired', product_id: 7 },
    { attribute_name: 'Key Switch Type', value: 'Mechanical (Cherry MX Brown)', product_id: 7 },
    { attribute_name: 'Backlight', value: 'RGB', product_id: 7 },
    { attribute_name: 'Layout', value: '60%', product_id: 7 },
    { attribute_name: 'Compatibility', value: 'Windows / Linux', product_id: 7 },

    { attribute_name: 'Connectivity', value: 'Wireless', product_id: 8 },
    { attribute_name: 'Key Switch Type', value: 'Membrane', product_id: 8 },
    { attribute_name: 'Backlight', value: 'RGB', product_id: 8 },
    { attribute_name: 'Layout', value: '75%', product_id: 8 },
    { attribute_name: 'Compatibility', value: 'Windows / macOS', product_id: 8 },

    { attribute_name: 'Connectivity', value: 'Wired', product_id: 9 },
    { attribute_name: 'Key Switch Type', value: 'Mechanical (Cherry MX Red)', product_id: 9 },
    { attribute_name: 'Backlight', value: 'None', product_id: 9 },
    { attribute_name: 'Layout', value: 'Full-size', product_id: 9 },
    { attribute_name: 'Compatibility', value: 'Windows', product_id: 9 },

    { attribute_name: 'Connectivity', value: 'Bluetooth 5.0', product_id: 10 },
    { attribute_name: 'Key Switch Type', value: 'Optical', product_id: 10 },
    { attribute_name: 'Backlight', value: 'RGB', product_id: 10 },
    { attribute_name: 'Layout', value: 'Tenkeyless (TKL)', product_id: 10 },
    { attribute_name: 'Compatibility', value: 'Windows / Linux', product_id: 10 },

    { attribute_name: 'Connectivity', value: 'Wireless', product_id: 11 },
    { attribute_name: 'Key Switch Type', value: 'Membrane', product_id: 11 },
    { attribute_name: 'Backlight', value: 'Single Color', product_id: 11 },
    { attribute_name: 'Layout', value: '60%', product_id: 11 },
    { attribute_name: 'Compatibility', value: 'macOS', product_id: 11 },

    { attribute_name: 'Connectivity', value: 'Wired', product_id: 12 },
    { attribute_name: 'Key Switch Type', value: 'Mechanical (Cherry MX Blue)', product_id: 12 },
    { attribute_name: 'Backlight', value: 'RGB', product_id: 12 },
    { attribute_name: 'Layout', value: '75%', product_id: 12 },
    { attribute_name: 'Compatibility', value: 'Windows / macOS', product_id: 12 },

    { attribute_name: 'Connectivity', value: 'Bluetooth 5.0', product_id: 13 },
    { attribute_name: 'Key Switch Type', value: 'Optical', product_id: 13 },
    { attribute_name: 'Backlight', value: 'None', product_id: 13 },
    { attribute_name: 'Layout', value: 'Full-size', product_id: 13 },
    { attribute_name: 'Compatibility', value: 'Windows', product_id: 13 },

    { attribute_name: 'Connectivity', value: 'Wireless', product_id: 14 },
    { attribute_name: 'Key Switch Type', value: 'Mechanical (Cherry MX Brown)', product_id: 14 },
    { attribute_name: 'Backlight', value: 'RGB', product_id: 14 },
    { attribute_name: 'Layout', value: 'Tenkeyless (TKL)', product_id: 14 },
    { attribute_name: 'Compatibility', value: 'Windows / macOS', product_id: 14 },

    { attribute_name: 'Connectivity', value: 'Wired', product_id: 15 },
    { attribute_name: 'Key Switch Type', value: 'Membrane', product_id: 15 },
    { attribute_name: 'Backlight', value: 'Single Color', product_id: 15 },
    { attribute_name: 'Layout', value: '60%', product_id: 15 },
    { attribute_name: 'Compatibility', value: 'Linux', product_id: 15 },

    { attribute_name: 'Connectivity', value: 'Bluetooth 5.0', product_id: 16 },
    { attribute_name: 'Key Switch Type', value: 'Optical', product_id: 16 },
    { attribute_name: 'Backlight', value: 'RGB', product_id: 16 },
    { attribute_name: 'Layout', value: '75%', product_id: 16 },
    { attribute_name: 'Compatibility', value: 'Windows / Linux', product_id: 16 },

    { attribute_name: 'Connectivity', value: 'Wireless', product_id: 17 },
    { attribute_name: 'Key Switch Type', value: 'Mechanical (Cherry MX Red)', product_id: 17 },
    { attribute_name: 'Backlight', value: 'None', product_id: 17 },
    { attribute_name: 'Layout', value: 'Full-size', product_id: 17 },
    { attribute_name: 'Compatibility', value: 'macOS', product_id: 17 },

    { attribute_name: 'Connectivity', value: 'Bluetooth 5.0', product_id: 3 },
    { attribute_name: 'Noice Cancellation', value: 'Active', product_id: 3 },
    { attribute_name: 'Battery Life', value: '20 hours', product_id: 3 },
    { attribute_name: 'microphone', value: 'Built-in', product_id: 3 },
    { attribute_name: 'Color', value: 'Black', product_id: 3 },

    { attribute_name: 'Connectivity', value: 'Wiredless', product_id: 18 },
    { attribute_name: 'Noice Cancellation', value: 'Active', product_id: 18 },
    { attribute_name: 'Battery Life', value: '20 hours', product_id: 18 },
    { attribute_name: 'microphone', value: 'Built-in', product_id: 18 },
    { attribute_name: 'Color', value: 'Black', product_id: 18 },

    { attribute_name: 'Connectivity', value: 'Bluetooth 5.0', product_id: 19 },
    { attribute_name: 'Noice Cancellation', value: 'Passive', product_id: 19 },
    { attribute_name: 'Battery Life', value: '15 hours', product_id: 19 },
    { attribute_name: 'microphone', value: 'Detachable', product_id: 19 },
    { attribute_name: 'Color', value: 'Black', product_id: 19 },

    { attribute_name: 'Connectivity', value: 'Wired', product_id: 20 },
    { attribute_name: 'Noice Cancellation', value: 'None', product_id: 20 },
    { attribute_name: 'Battery Life', value: '', product_id: 20 },
    { attribute_name: 'microphone', value: 'None', product_id: 20 },
    { attribute_name: 'Color', value: 'White', product_id: 20 },

    { attribute_name: 'Connectivity', value: 'Bluetooth 5.1', product_id: 21 },
    { attribute_name: 'Noice Cancellation', value: 'Active', product_id: 21 },
    { attribute_name: 'Battery Life', value: '25 hours', product_id: 21 },
    { attribute_name: 'microphone', value: 'Built-in', product_id: 21 },
    { attribute_name: 'Color', value: 'Blue', product_id: 21 },

    { attribute_name: 'Connectivity', value: 'Wired', product_id: 22 },
    { attribute_name: 'Noice Cancellation', value: 'None', product_id: 22 },
    { attribute_name: 'Battery Life', value: '', product_id: 22 },
    { attribute_name: 'microphone', value: 'None', product_id: 22 },
    { attribute_name: 'Color', value: 'Black', product_id: 22 },

    { attribute_name: 'Connectivity', value: 'Wireless', product_id: 23 },
    { attribute_name: 'Noice Cancellation', value: 'Passive', product_id: 23 },
    { attribute_name: 'Battery Life', value: '18 hours', product_id: 23 },
    { attribute_name: 'microphone', value: 'Detachable', product_id: 23 },
    { attribute_name: 'Color', value: 'White', product_id: 23 },

    { attribute_name: 'Connectivity', value: 'Bluetooth 5.0', product_id: 24 },
    { attribute_name: 'Noice Cancellation', value: 'Active', product_id: 24 },
    { attribute_name: 'Battery Life', value: '30 hours', product_id: 24 },
    { attribute_name: 'microphone', value: 'Built-in', product_id: 24 },
    { attribute_name: 'Color', value: 'Red', product_id: 24 },

    { attribute_name: 'Connectivity', value: 'Wired', product_id: 25 },
    { attribute_name: 'Noice Cancellation', value: 'None', product_id: 25 },
    { attribute_name: 'Battery Life', value: '', product_id: 25 },
    { attribute_name: 'microphone', value: 'None', product_id: 25 },
    { attribute_name: 'Color', value: 'Blue', product_id: 25 },

    { attribute_name: 'Connectivity', value: 'Wireless', product_id: 26 },
    { attribute_name: 'Noice Cancellation', value: 'Passive', product_id: 26 },
    { attribute_name: 'Battery Life', value: '20 hours', product_id: 26 },
    { attribute_name: 'microphone', value: 'Detachable', product_id: 26 },
    { attribute_name: 'Color', value: 'Black', product_id: 26 },

    { attribute_name: 'Connectivity', value: 'Bluetooth 5.1', product_id: 27 },
    { attribute_name: 'Noice Cancellation', value: 'Active', product_id: 27 },
    { attribute_name: 'Battery Life', value: '22 hours', product_id: 27 },
    { attribute_name: 'microphone', value: 'Built-in', product_id: 27 },
    { attribute_name: 'Color', value: 'White', product_id: 27 },

    { attribute_name: 'Connectivity', value: 'Wired', product_id: 28 },
    { attribute_name: 'Noice Cancellation', value: 'None', product_id: 28 },
    { attribute_name: 'Battery Life', value: '', product_id: 28 },
    { attribute_name: 'microphone', value: 'None', product_id: 28 },
    { attribute_name: 'Color', value: 'Gray', product_id: 28 },

    { attribute_name: 'Connectivity', value: 'Wireless', product_id: 29 },
    { attribute_name: 'Noice Cancellation', value: 'Passive', product_id: 29 },
    { attribute_name: 'Battery Life', value: '19 hours', product_id: 29 },
    { attribute_name: 'microphone', value: 'Detachable', product_id: 29 },
    { attribute_name: 'Color', value: 'Blue', product_id: 29 },

    { attribute_name: 'Connectivity', value: 'Bluetooth 5.0', product_id: 30 },
    { attribute_name: 'Noice Cancellation', value: 'Active', product_id: 30 },
    { attribute_name: 'Battery Life', value: '28 hours', product_id: 30 },
    { attribute_name: 'microphone', value: 'Built-in', product_id: 30 },
    { attribute_name: 'Color', value: 'Black', product_id: 30 },

    { attribute_name: 'Display Size', value: '14 inches', product_id: 31 },
    { attribute_name: 'Disk Size', value: '64 GB', product_id: 31 },
    { attribute_name: 'RAM', value: '4 GB', product_id: 31 },
    { attribute_name: 'Operating System', value: 'Windows 11 S', product_id: 31 },

    { attribute_name: 'Display Size', value: '15.6 inches', product_id: 32 },
    { attribute_name: 'Disk Size', value: '128 GB', product_id: 32 },
    { attribute_name: 'RAM', value: '8 GB', product_id: 32 },
    { attribute_name: 'Operating System', value: 'Windows 11 Home', product_id: 32 },

    { attribute_name: 'Display Size', value: '13.3 inches', product_id: 33 },
    { attribute_name: 'Disk Size', value: '128 GB', product_id: 33 },
    { attribute_name: 'RAM', value: '8 GB', product_id: 33 },
    { attribute_name: 'Operating System', value: 'Windows 11 Home', product_id: 33 },

    { attribute_name: 'Display Size', value: '15.6 inches', product_id: 34 },
    { attribute_name: 'Disk Size', value: '128 GB', product_id: 34 },
    { attribute_name: 'RAM', value: '16 GB', product_id: 34 },
    { attribute_name: 'Operating System', value: 'Windows 11 Home', product_id: 34 },

    { attribute_name: 'Display Size', value: '14 inches', product_id: 35 },
    { attribute_name: 'Disk Size', value: '256 GB', product_id: 35 },
    { attribute_name: 'RAM', value: '8 GB', product_id: 35 },
    { attribute_name: 'Operating System', value: 'Windows 11 Home', product_id: 35 },

    { attribute_name: 'Display Size', value: '15.6 inches', product_id: 36 },
    { attribute_name: 'Disk Size', value: '256 GB', product_id: 36 },
    { attribute_name: 'RAM', value: '16 GB', product_id: 36 },
    { attribute_name: 'Operating System', value: 'Windows 11 Home', product_id: 36 },

    { attribute_name: 'Display Size', value: '13.3 inches', product_id: 37 },
    { attribute_name: 'Disk Size', value: '256 GB', product_id: 37 },
    { attribute_name: 'RAM', value: '8 GB', product_id: 37 },
    { attribute_name: 'Operating System', value: 'Windows 11 Home', product_id: 37 },

    { attribute_name: 'Display Size', value: '15.6 inches', product_id: 38 },
    { attribute_name: 'Disk Size', value: '256 GB', product_id: 38 },
    { attribute_name: 'RAM', value: '16 GB', product_id: 38 },
    { attribute_name: 'Operating System', value: 'Windows 11 Home', product_id: 38 },

    { attribute_name: 'Display Size', value: '14 inches', product_id: 39 },
    { attribute_name: 'Disk Size', value: '512 GB', product_id: 39 },
    { attribute_name: 'RAM', value: '8 GB', product_id: 39 },
    { attribute_name: 'Operating System', value: 'Windows 11 Home', product_id: 39 },

    { attribute_name: 'Display Size', value: '15.6 inches', product_id: 40 },
    { attribute_name: 'Disk Size', value: '512 GB', product_id: 40 },
    { attribute_name: 'RAM', value: '16 GB', product_id: 40 },
    { attribute_name: 'Operating System', value: 'Windows 11 Home', product_id: 40 },

    { attribute_name: 'Display Size', value: '13.3 inches', product_id: 41 },
    { attribute_name: 'Disk Size', value: '512 GB', product_id: 41 },
    { attribute_name: 'RAM', value: '8 GB', product_id: 41 },
    { attribute_name: 'Operating System', value: 'Windows 11 Home', product_id: 41 },

    { attribute_name: 'Display Size', value: '15.6 inches', product_id: 42 },
    { attribute_name: 'Disk Size', value: '512 GB', product_id: 42 },
    { attribute_name: 'RAM', value: '16 GB', product_id: 42 },
    { attribute_name: 'Operating System', value: 'Windows 11 Home', product_id: 42 },

    { attribute_name: 'Display Size', value: '15.6 inches', product_id: 43 },
    { attribute_name: 'Disk Size', value: '1 TB', product_id: 43 },
    { attribute_name: 'RAM', value: '16 GB', product_id: 43 },
    { attribute_name: 'Operating System', value: 'Windows 11 Home', product_id: 43 },

    { attribute_name: 'Display Size', value: '14 inches', product_id: 44 },
    { attribute_name: 'Disk Size', value: '1 TB', product_id: 44 },
    { attribute_name: 'RAM', value: '8 GB', product_id: 44 },
    { attribute_name: 'Operating System', value: 'Windows 11 Home', product_id: 44 },

    { attribute_name: 'Display Size', value: '15.6 inches', product_id: 45 },
    { attribute_name: 'Disk Size', value: '1 TB', product_id: 45 },
    { attribute_name: 'RAM', value: '16 GB', product_id: 45 },
    { attribute_name: 'Operating System', value: 'Windows 11 Home', product_id: 45 },

    { attribute_name: 'Display Size', value: '13.3 inches', product_id: 46 },
    { attribute_name: 'Disk Size', value: '1 TB', product_id: 46 },
    { attribute_name: 'RAM', value: '8 GB', product_id: 46 },
    { attribute_name: 'Operating System', value: 'Windows 11 Home', product_id: 46 },

    { attribute_name: 'Display Size', value: '15.6 inches', product_id: 47 },
    { attribute_name: 'Disk Size', value: '1 TB', product_id: 47 },
    { attribute_name: 'RAM', value: '16 GB', product_id: 47 },
    { attribute_name: 'Operating System', value: 'Windows 11 Home', product_id: 47 },

    { attribute_name: 'Display Size', value: '14 inches', product_id: 48 },
    { attribute_name: 'Disk Size', value: '1 TB', product_id: 48 },
    { attribute_name: 'RAM', value: '8 GB', product_id: 48 },
    { attribute_name: 'Operating System', value: 'Windows 11 Home', product_id: 48 },

    { attribute_name: 'Display Size', value: '15.6 inches', product_id: 49 },
    { attribute_name: 'Disk Size', value: '1 TB', product_id: 49 },
    { attribute_name: 'RAM', value: '16 GB', product_id: 49 },
    { attribute_name: 'Operating System', value: 'Windows 11 Home', product_id: 49 },

    { attribute_name: 'Display Size', value: '13.3 inches', product_id: 50 },
    { attribute_name: 'Disk Size', value: '1 TB', product_id: 50 },
    { attribute_name: 'RAM', value: '8 GB', product_id: 50 },
    { attribute_name: 'Operating System', value: 'Windows 11 Home', product_id: 50 },

    { attribute_name: 'Display Size', value: '15.6 inches', product_id: 51 },
    { attribute_name: 'Disk Size', value: '1 TB', product_id: 51 },
    { attribute_name: 'RAM', value: '16 GB', product_id: 51 },
    { attribute_name: 'Operating System', value: 'Windows 11 Home', product_id: 51 },

    { attribute_name: 'Display Size', value: '14 inches', product_id: 52 },
    { attribute_name: 'Disk Size', value: '1 TB', product_id: 52 },
    { attribute_name: 'RAM', value: '8 GB', product_id: 52 },
    { attribute_name: 'Operating System', value: 'Windows 11 Home', product_id: 52 },

    { attribute_name: 'Display Size', value: '15.6 inches', product_id: 53 },
    { attribute_name: 'Disk Size', value: '1 TB', product_id: 53 },
    { attribute_name: 'RAM', value: '16 GB', product_id: 53 },
    { attribute_name: 'Operating System', value: 'Windows 11 Home', product_id: 53 },

    { attribute_name: 'Display Size', value: '13.3 inches', product_id: 54 },
    { attribute_name: 'Disk Size', value: '1 TB', product_id: 54 },
    { attribute_name: 'RAM', value: '8 GB', product_id: 54 },
    { attribute_name: 'Operating System', value: 'Windows 11 Home', product_id: 54 },

    { attribute_name: 'Display Size', value: '15.6 inches', product_id: 55 },
    { attribute_name: 'Disk Size', value: '1 TB', product_id: 55 },
    { attribute_name: 'RAM', value: '16 GB', product_id: 55 },
    { attribute_name: 'Operating System', value: 'Windows 11 Home', product_id: 55 },
  ]);
};
