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

const techCategories = [
    'Computers',
    'Smartphones',
    'Tablets',
    'Wearables',
    'Smart Home Devices',
    'Gaming Consoles',
    'Networking Equipment',
    'Software',
    'Hardware',
    'Tech Accessories'
];

// Function to seed categories
async function seedCategories(n) {
    const categories = [];
    for (let i = 0; i < n; i++) {
        categories.push({
            name: techCategories[i % techCategories.length], // Cycle through the techCategories list
        });
    }

    const insertQuery = `
        INSERT INTO category (name)
        VALUES ($1)
    `;

    try {
        for (const category of categories) {
            await client.query(insertQuery, [category.name]);
        }
        console.log(`Seeded ${n} categories`);
    } catch (err) {
        console.error('Error seeding categories:', err);
    } finally {
        client.end();
    }
}

// Seed 50 categories
seedCategories(10)
    .then(() => process.exit())
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });