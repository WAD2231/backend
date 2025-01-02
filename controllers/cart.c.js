const Cart = require('../models/cart.m.js');

module.exports = {
    get: async (req, res) => {
        try {
            const userID = req.user.id;
            const size = parseInt(req.query.size) || 10;
            const page = parseInt(req.query.page) || 1;

            const result = await Cart.get(userID, size, page);
            res.send(result);
        }
        catch (err) {
            res.status(500).send({ message: err.message });
        }
    },
};