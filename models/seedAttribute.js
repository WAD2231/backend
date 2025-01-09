const { Client } = require('pg');
const { faker } = require('@faker-js/faker');

// Database connection parameters
const client = new Client({
    user: 'postgres', // default PostgreSQL user
    host: 'localhost', // default PostgreSQL host
    database: 'demo-db', // your database name
    password: 'postgres',
    port: 5432, // default PostgreSQL port
});
client.connect();

const techAttributes = [
    { name: 'Processor', values: ['Intel i7', 'Intel i5', 'AMD Ryzen 7', 'AMD Ryzen 5'] },
    { name: 'RAM', values: ['8GB', '16GB', '32GB'] },
    { name: 'Storage', values: ['256GB SSD', '512GB SSD', '1TB SSD', '2TB HDD'] },
    { name: 'Screen Size', values: ['13 inch', '15 inch', '17 inch'] },
    { name: 'Battery Life', values: ['5 hours', '8 hours', '12 hours'] },
    { name: 'Weight', values: ['1.2kg', '1.5kg', '2kg'] },
    { name: 'Color', values: ['Black', 'Silver', 'Gray'] },
    { name: 'Operating System', values: ['Windows 10', 'Windows 11', 'macOS', 'Linux'] },
    { name: 'Graphics Card', values: ['NVIDIA GTX 1650', 'NVIDIA RTX 2060', 'AMD Radeon RX 5700'] },
    { name: 'Connectivity', values: ['WiFi 6', 'Bluetooth 5.0', 'Ethernet'] }
];

// Function to seed attributes
async function seedAttributes(n) {
    const attributes = [];
    for (let i = 0; i < n; i++) {
        const attribute = faker.helpers.arrayElement(techAttributes);
        attributes.push({
            attribute_name: attribute.name,
            value: faker.helpers.arrayElement(attribute.values),
            product_id: faker.number.int({ min: 1, max: 200 }) // Assuming product_id ranges from 1 to 50
        });
    }

    const insertQuery = `
        INSERT INTO attributes (attribute_name, value, product_id)
        VALUES ($1, $2, $3)
    `;

    try {
        for (const attribute of attributes) {
            await client.query(insertQuery, [
                attribute.attribute_name,
                attribute.value,
                attribute.product_id
            ]);
        }
        console.log(`Seeded ${n} attributes`);
    } catch (err) {
        console.error('Error seeding attributes:', err);
    } finally {
        client.end();
    }
}

// Seed 100 attributes
seedAttributes(100)
    .then(() => process.exit())
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });