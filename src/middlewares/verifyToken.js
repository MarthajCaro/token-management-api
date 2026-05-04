const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
const authHeader = req.headers['authorization'];

if (!authHeader) {
    return res.status(401).json({ message: "Token required" });
}

  const token = authHeader.split(' ')[1]; // remove "Bearer"

if (!token) {
    return res.status(401).json({ message: "Token required" });
}

jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
    }

    // We store the decoded information in req to use it in the endpoint.
    req.client = decoded;
    next();
});
};

module.exports = verifyToken;
