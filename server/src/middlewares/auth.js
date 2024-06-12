const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(403).json({ message: 'No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(500).json({ message: 'Failed to authenticate token' });

        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    });
}

module.exports = verifyToken;