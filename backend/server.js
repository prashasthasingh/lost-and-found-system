// server.js
// Main entry point for the backend server

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Enable CORS so frontend (React on port 3000) can call this backend
app.use(cors());

// ---- API Routes ----
// Auth routes: /api/register and /api/login
app.use('/api', require('./routes/authRoutes'));

// Item routes: /api/items
app.use('/api/items', require('./routes/itemRoutes'));

// Root route - just a health check
app.get('/', (req, res) => {
  res.send('Lost & Found API is running...');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
