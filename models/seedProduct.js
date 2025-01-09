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
const types = ['Computers', 'Smartphones', 'Tablets', 'Wearables', 'Smart Home Devices', 'Gaming Consoles', 'Networking Equipment', 'Software', 'Hardware', 'Tech Accessories'];
const products_Name = [
    'SmartX Pro',
    'UltraPad 360',
    'QuantumPC',
    'SkyBeam Speaker',
    'SmartView Camera',
    'EchoTech Wireless Earbuds',
    'FlexCharge Powerbank',
    'VortexX Gaming Console',
    'MegaLens 5000',
    'QuantumNet Router',
    'PulseWear Smartwatch',
    'AeroDrone Pro',
    'NanoFrame Monitor',
    'LightWave VR',
    'HyperDrive SSD',
    'StreamMaster TV Box',
    'TitanMouse',
    'InfinityPad Tablet',
    'ProWave Bluetooth Speaker',
    'VividCam 4K',
    'HorizonX Laptop',
    'NeonGlow Keyboard',
    'WaveRunner Smart Glasses',
    'TurboMinds Smart Lamp',
    'HyperCube VR Headset',
    'OmniHub Smart Hub',
    'CoolStream Air Cooler',
    'QuantumFlex Wireless Charger',
    'ZeroLatency Headphones',
    'SyncPower Solar Panel',
    'SmartCore Fitness Tracker',
    'PocketX Smartphone',
    'UltraMate Laptop Cooler',
    'TechNest Home Assistant',
    'EchoJet Wireless Headset',
    'VortexPro Smart Home Security',
    'NightVision Camera',
    'TurboFlex Power Adapter',
    'UltraZoom Telescope',
    'SmartPulse Blood Pressure Monitor',
    'EdgeBlade Gaming Mouse',
    'LuminaSound Earphones',
    'SmartDash HUD System',
    'NovaBeam Projector',
    'CoreTech Smart Light',
    'FlexCharge Solar Power Bank',
    'EchoNote Digital Notebook',
    'StreamLine Wireless Router',
    'ByteX Laptop Stand',
    'RoboVacuum 3000',
    'SoundSphere Home Theater',
    'SkyLink Smart Drone',
    'NanoPro USB Hub',
    'ZeroG VR Mat',
    'PixelPro Camera Lens',
    'OmniDrone X5',
    'BlueWave Water Speaker',
    'QuickDock Wireless Charger',
    'SmartAir Purifier',
    'PowerMatic Battery Pack',
    'UltraFast Memory Stick',
    'XtremeGear Smart Backpack',
    'VibeFit Wearable Trainer',
    'TechVision AR Glasses',
    'SmartGrid Energy System',
    'ChargeHub Docking Station',
    'AeroFone Wireless Earbuds',
    'ZoomMate Portable Projector',
    'CybriX Smartwatch',
    'VividLED Desk Lamp',
    '3DVision Printer',
    'InfinitySync Fitness Band',
    'NovaLink Smart Door Lock',
    'EcoWave Energy Monitor',
    'SolarX Smart Battery',
    'PowerGlide Charging Dock',
    'ProShield Screen Protector',
    'ClipLight Smart Flashlight',
    'SmartLock Door System',
    'CrystalPro Lens',
    'GameHaven Console',
    'SpeedWave Internet Booster',
    'PulseLock Smart Lock',
    'FutureTune Car Audio System',
    'FlexAir Smart Fan',
    'UltraMax Power Tool',
    'HyperCloud Storage',
    'TrueSound Earbuds',
    'TurboCam Action Camera',
    'FlexyTech Multi-tool',
    'NetMax Wi-Fi Extender',
    'StealthPro Security Camera',
    'ProGrip Gamepad',
    'SolarWave Battery Pack',
    'EliteFit Smart Sneakers',
    'TechMate Tablet Stand',
    'EnergyZap Power Bank',
    'FlexLens Camera Filter',
    'ClearVision VR Glasses',
    'AirGlide Smart Hoverboard'
  ];
  
async function seedProducts(n) {
    const products = [];
    for (let i = 0; i < n; i++) {
        products.push({
            product_name: faker.helpers.arrayElement(products_Name),
            price: faker.commerce.price(),
            description: faker.commerce.productDescription(),
            stock: faker.number.int({ min: 1, max: 100 }),
            discount: faker.number.int({ min: 0, max: 50 }),
            type: faker.helpers.arrayElement(types),
            category_id: faker.number.int({ min: 1, max: 10 }),
            manufacturer_id: faker.number.int({ min: 1, max: 10 }),
        });
    }

    const insertQuery = `
        INSERT INTO product (product_name, price, description, type, stock, discount, category_id, manufacturer_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `;

    try {
        for (const product of products) {
            await client.query(insertQuery, [
                product.product_name,
                product.price,
                product.description,
                product.type,
                product.stock,
                product.discount,
                product.category_id,
                product.manufacturer_id
            ]);
        }
        console.log(`Seeded ${n} products`);
    } catch (err) {
        console.error('Error seeding products:', err);
    } finally {
        client.end();
    }
}

// Seed 100 products
seedProducts(100)
    .then(() => process.exit())
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });