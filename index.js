const express = require('express');
require('dotenv').config();
const app = express();
require('./models/db');

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});