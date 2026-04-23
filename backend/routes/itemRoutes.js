// routes/itemRoutes.js
// Defines all endpoints for managing lost/found items
// All routes are protected - user must be logged in

const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {
  addItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
  searchItems,
} = require('../controllers/itemController');

// IMPORTANT: /search route must come BEFORE /:id route
// Otherwise Express treats "search" as an ID value

// GET /api/items/search?name=xyz → Search items by name
router.get('/search', protect, searchItems);

// POST /api/items → Add a new item
router.post('/', protect, addItem);

// GET /api/items → Get all items
router.get('/', protect, getAllItems);

// GET /api/items/:id → Get single item by ID
router.get('/:id', protect, getItemById);

// PUT /api/items/:id → Update an item
router.put('/:id', protect, updateItem);

// DELETE /api/items/:id → Delete an item
router.delete('/:id', protect, deleteItem);

module.exports = router;
