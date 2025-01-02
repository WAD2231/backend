const https = require('https');
const express = require('express');
const fs = require('fs');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const options = {
    key: fs.readFileSync('./sslkeys/key.pem'),
    cert: fs.readFileSync('./sslkeys/cert.pem')
}

app.use(require('./middlewares/verification.js'));
app.use('/api/accounts', require('./routers/account.r.js'));
app.use('/api/transactions', require('./routers/transaction.r.js'));

const server = https.createServer(options, app);
server.listen(process.env.EPAY_PORT, () => {
    console.log(`Server is running on port ${process.env.EPAY_PORT}`);
});