// models/Item.js
// This defines the structure (schema) of a Lost/Found Item in MongoDB

const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  // Name of the lost or found item
  itemName: {
    type: String,
    required: true,
    trim: true,
  },

  // Description of the item
  description: {
    type: String,
    required: true,
  },

  // Whether item is Lost or Found
  type: {
    type: String,
    enum: ['Lost', 'Found'], // Only these two values allowed
    required: true,
  },

  // Location where item was lost/found
  location: {
    type: String,
    required: true,
  },

  // Date when item was lost/found
  date: {
    type: Date,
    required: true,
  },

  // Contact information of the person
  contactInfo: {
    type: String,
    required: true,
  },

  // Reference to the User who posted this item
  user: {
    type: mongoose.Schema.Types.ObjectId, // Links to User model
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt
});

module.exports = mongoose.model('Item', ItemSchema);
