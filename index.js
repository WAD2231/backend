const express = require('express');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();
const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('./middlewares/passport')(app);
app.use('/api/users', require('./routers/user.r.js'));
app.use('/api/auth', require('./routers/auth.r.js'));
app.use('/api/profiles', require('./routers/profile.r.js'));
app.use('/api/reviews', require('./routers/review.r.js'));
app.use('/api/orders', require('./routers/order.r.js'));

app.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        return res.status(200).send('Authenticated');
    }
    return res.status(401).send('Not authenticated');
});

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});