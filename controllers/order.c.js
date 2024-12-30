const fs = require('fs');
const jwt = require('jsonwebtoken');
const priKey = fs.readFileSync('./sshkeys/private.pem', 'utf8');

module.exports = { 
    processPayment: async (req, res) => {
        try {
            const token = jwt.sign(req.body, priKey, {algorithm: 'RS256'});
            const response = await fetch(`https://localhost:${process.env.EPAY_PORT}/api/transactions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({token})
            });
            const result = await response.json();
            return res.status(response.status).json(result);
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    }
};