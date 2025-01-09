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

// Connect to the database
client.connect();

const techManufacturers = [
    'Apple',
    'Samsung',
    'Microsoft',
    'Sony',
    'Intel',
    'AMD',
    'NVIDIA',
    'HP',
    'Dell',
    'Lenovo'
];
// Function to seed manufacturers
async function seedManufacturers(n) {
    const manufacturers = [];
    for (let i = 0; i < n; i++) {
        manufacturers.push({
            manufacturer_name: techManufacturers[i % techManufacturers.length], // Cycle through the techManufacturers list
        });
    }

    const insertQuery = `
        INSERT INTO manufacturer (manufacturer_name)
        VALUES ($1)
    `;

    try {
        for (const manufacturer of manufacturers) {
            await client.query(insertQuery, [manufacturer.manufacturer_name]);
        }
        console.log(`Seeded ${n} manufacturers`);
    } catch (err) {
        console.error('Error seeding manufacturers:', err);
    } finally {
        client.end();
    }
}

// Seed 20 manufacturers
seedManufacturers(10)
    .then(() => process.exit())
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });