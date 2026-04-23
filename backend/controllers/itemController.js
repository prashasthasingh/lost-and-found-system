// controllers/itemController.js
// Contains all CRUD operations for Lost/Found Items

const Item = require('../models/Item');

// ---------------------------------------------------------------
// @route   POST /api/items
// @desc    Add a new lost/found item
// @access  Private (requires login)
// ---------------------------------------------------------------
const addItem = async (req, res) => {
  const { itemName, description, type, location, date, contactInfo } = req.body;

  try {
    // Validate required fields
    if (!itemName || !description || !type || !location || !date || !contactInfo) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    // Create item and link it to the logged-in user
    const item = await Item.create({
      itemName,
      description,
      type,
      location,
      date,
      contactInfo,
      user: req.user._id, // req.user set by authMiddleware
    });

    res.status(201).json({ message: 'Item added successfully', item });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ---------------------------------------------------------------
// @route   GET /api/items
// @desc    Get all items
// @access  Private
// ---------------------------------------------------------------
const getAllItems = async (req, res) => {
  try {
    // Fetch all items and populate the user's name and email
    const items = await Item.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ---------------------------------------------------------------
// @route   GET /api/items/search?name=xyz
// @desc    Search items by itemName (partial match)
// @access  Private
// ---------------------------------------------------------------
const searchItems = async (req, res) => {
  const { name } = req.query;

  try {
    // Use regex for case-insensitive partial search
    const items = await Item.find({
      itemName: { $regex: name, $options: 'i' },
    }).populate('user', 'name email');

    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ---------------------------------------------------------------
// @route   GET /api/items/:id
// @desc    Get a single item by its ID
// @access  Private
// ---------------------------------------------------------------
const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate('user', 'name email');

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ---------------------------------------------------------------
// @route   PUT /api/items/:id
// @desc    Update an item (only the owner can update)
// @access  Private
// ---------------------------------------------------------------
const updateItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Check if the logged-in user is the owner of this item
    if (item.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this item' });
    }

    // Update the item with new values
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
    });

    res.json({ message: 'Item updated successfully', item: updatedItem });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ---------------------------------------------------------------
// @route   DELETE /api/items/:id
// @desc    Delete an item (only the owner can delete)
// @access  Private
// ---------------------------------------------------------------
const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Check if the logged-in user is the owner of this item
    if (item.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this item' });
    }

    await item.deleteOne();
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { addItem, getAllItems, getItemById, updateItem, deleteItem, searchItems };
