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

// Function to seed reviews
async function seedReviews(n) {
    const reviews = [];
    for (let i = 0; i < n; i++) {
        reviews.push({
            content: faker.lorem.paragraph(),
            rating: faker.number.int({ min: 1, max: 5 }),
            posted_at: faker.date.past(),
            product_id: faker.number.int({ min: 100, max: 200 }), // Assuming product_id ranges from 1 to 50
            user_id: 1 // Assuming user_id ranges from 1 to 100
        });
    }

    const insertQuery = `
        INSERT INTO reviews ( content, rating, posted_at, product_id, user_id)
        VALUES ($1, $2, $3, $4, $5)
    `;

    try {
        for (const review of reviews) {
            await client.query(insertQuery, [
                review.content,
                review.rating,
                review.posted_at,
                review.product_id,
                review.user_id
            ]);
        }
        console.log(`Seeded ${n} reviews`);
    } catch (err) {
        console.error('Error seeding reviews:', err);
    } finally {
        client.end();
    }
}

// Seed 100 reviews
seedReviews(100)
    .then(() => process.exit())
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });