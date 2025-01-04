const express = require('express');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();
const app = express();

app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
require('./middlewares/passport')(app);
app.use('/api/auth', require('./routers/auth.r.js'));
app.use('/api/reviews', require('./routers/review.r.js'));
app.use('/api/users', require('./routers/user.r.js'));
app.use('/api/profiles', require('./routers/profile.r.js'));
app.use('/api/carts', require('./routers/cart.r.js'));
app.use('/api/orders', require('./routers/order.r.js'));

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Main server is running on port ${process.env.SERVER_PORT}`);
});