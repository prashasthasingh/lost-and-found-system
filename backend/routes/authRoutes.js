// routes/authRoutes.js
// Defines the endpoints for user registration and login

const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// POST /api/register → Register a new user
router.post('/register', registerUser);

// POST /api/login → Login existing user
router.post('/login', loginUser);

module.exports = router;
