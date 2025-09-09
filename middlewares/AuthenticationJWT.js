const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyToken (req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) return res.sendStatus(403);
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) return res.sendStatus(403);
            req.user = {
                //to extract out the data for exercise based on id and system created.
            id: decoded.userId,       
            displayName: decoded.displayName
            }
            next();
        });
    };

module.exports = verifyToken;



