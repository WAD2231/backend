module.exports = {
    verifyAdmin : (req, res, next) => {
        if (!req.isAuthenticated()) {
            return res.status(401).json({ message: "Forbidden: Only administrators can access this route" });
        }
        
        if (req.user.permission != process.env.PERMISSION_ADMIN) {
            return res.status(403).json({ message: "Forbidden: Only administrators can access this route" });
        }

        return next();
    },

    verifyUser : (req, res, next) => {
        if (!req.isAuthenticated()) {
            return res.status(401).json({ message: "Only logged in users can access this route" });
        }

        return next();
    }
};
