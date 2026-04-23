// models/User.js
// This defines the structure (schema) of a User in MongoDB

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  // User's full name
  name: {
    type: String,
    required: true, // This field is mandatory
    trim: true,     // Remove extra spaces
  },

  // User's email - must be unique in the database
  email: {
    type: String,
    required: true,
    unique: true,   // No two users can have same email
    lowercase: true, // Store as lowercase
  },

  // Hashed password (never store plain text!)
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

module.exports = mongoose.model('User', UserSchema);
