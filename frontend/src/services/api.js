// src/services/api.js
// This file sets up Axios for making HTTP requests to the backend
// All API calls go through this file

import axios from 'axios';

// Base URL for our backend API
const API_URL = 'https://lost-found-backend-evwt.onrender.com';

// Create an Axios instance with the backend base URL
const api = axios.create({
  baseURL: API_URL,
});

// --------------- AUTH API CALLS ---------------

// Register a new user
export const registerUser = (userData) => api.post('/register', userData);

// Login user
export const loginUser = (userData) => api.post('/login', userData);

// --------------- ITEMS API CALLS ---------------
// For item routes, we need to send the JWT token in headers

// Helper to get auth header with token from localStorage
const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

// Add a new item (POST /api/items)
export const addItem = (itemData) => api.post('/items', itemData, getAuthHeader());

// Get all items (GET /api/items)
export const getAllItems = () => api.get('/items', getAuthHeader());

// Get single item by ID (GET /api/items/:id)
export const getItemById = (id) => api.get(`/items/${id}`, getAuthHeader());

// Update an item (PUT /api/items/:id)
export const updateItem = (id, itemData) => api.put(`/items/${id}`, itemData, getAuthHeader());

// Delete an item (DELETE /api/items/:id)
export const deleteItem = (id) => api.delete(`/items/${id}`, getAuthHeader());

// Search items by name (GET /api/items/search?name=xyz)
export const searchItems = (name) => api.get(`/items/search?name=${name}`, getAuthHeader());

export default api;
