const fs = require('fs');
const jwt = require('jsonwebtoken');
const pubKey = fs.readFileSync('./sshkeys/public.pem', 'utf8');

module.exports = async(req, res, next) => {
    try {
        const token = req.body.token;
        if (!token) {
            return res.status(401).json({message: 'No token provided'});
        }
        jwt.verify(token, pubKey, {algorithms: ['RS256']}, (err, decoded) => {
            if (err) {
                return res.status(403).json({message: err.message});
            }

            req.transaction = decoded;
        });
        next();
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
};