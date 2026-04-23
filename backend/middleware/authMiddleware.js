// middleware/authMiddleware.js
// This middleware protects routes so only logged-in users can access them

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // Check if the Authorization header has a Bearer token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract token from header: "Bearer <token>"
      token = req.headers.authorization.split(' ')[1];

      // Verify the token using our secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the user info to the request (excluding password)
      req.user = await User.findById(decoded.id).select('-password');

      // Call next() to move to the actual route handler
      next();
    } catch (error) {
      // Token is invalid or expired
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
  }

  if (!token) {
    // No token was provided
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }
};

module.exports = protect;
