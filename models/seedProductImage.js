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

// Function to seed product images
async function seedProductImages(n) {
    const productImages = [];
    for (let i = 0; i < n; i++) {
        const productId = faker.number.int({ min: 1, max: 50 }); // Assuming product_id ranges from 1 to 50
        const images = [];
        const numImages = faker.number.int({ min: 1, max: 5 }); // Each product can have 1 to 5 images
        for (let j = 0; j < numImages; j++) {
            images.push(faker.image.url(640, 480, 'tech', true)); // Generate tech-related image URLs
        }
        productImages.push({
            product_id: productId,
            images: images
        });
    }

    const insertQuery = `
        INSERT INTO product_image (product_id, image_url)
        VALUES ($1, $2)
    `;

    try {
        for (const productImage of productImages) {
            for (const imageUrl of productImage.images) {
                await client.query(insertQuery, [
                    productImage.product_id,
                    imageUrl
                ]);
            }
        }
        console.log(`Seeded ${n} product images`);
    } catch (err) {
        console.error('Error seeding product images:', err);
    } finally {
        client.end();
    }
}

// Seed 100 product images
seedProductImages(100)
    .then(() => process.exit())
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });