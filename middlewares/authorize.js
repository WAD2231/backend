const USER = process.env.PERMISSION_USER;
const ADMIN = process.env.PERMISSION_ADMIN;

module.exports = (permission) => {
    return (req, res, next) => {
        if (req.user.permission === ADMIN) {
            return next();
        }

        if (req.user.permission !== permission) {
            return res.status(403).send("Forbidden");
        }

        return next();
    };
};
