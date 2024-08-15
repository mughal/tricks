// middlewares/authMiddleware.js

module.exports = (req, res, next) => {
    if (req.session && req.session.userId) {
        // User is authenticated
        next();
    } else {
        // User is not authenticated
        res.status(401).json({ error: 'Unauthorized' });
    }
};
