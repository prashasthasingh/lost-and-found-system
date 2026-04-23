// src/pages/Dashboard.js
// Main dashboard page - only accessible when logged in
// Contains: Add item form, search, view all items, update, delete

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import {
  addItem,
  getAllItems,
  updateItem,
  deleteItem,
  searchItems,
} from '../services/api';

// Empty form structure to reuse
const emptyForm = {
  itemName: '',
  description: '',
  type: 'Lost',
  location: '',
  date: '',
  contactInfo: '',
};

const Dashboard = () => {
  const [items, setItems] = useState([]);         // All items displayed
  const [formData, setFormData] = useState(emptyForm); // Add/Edit form data
  const [editId, setEditId] = useState(null);     // ID of item being edited
  const [searchQuery, setSearchQuery] = useState(''); // Search input
  const [message, setMessage] = useState('');     // Success/Error message
  const [msgType, setMsgType] = useState('');     // 'success' or 'error'
  const [loading, setLoading] = useState(false);

  // Get logged-in user info from localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  // Load all items when the page loads
  useEffect(() => {
    fetchItems();
  }, []);

  // Fetch all items from backend
  const fetchItems = async () => {
    try {
      const res = await getAllItems();
      setItems(res.data);
    } catch (err) {
      showMessage('Failed to load items', 'error');
    }
  };

  // Show a message and auto-hide it after 3 seconds
  const showMessage = (text, type) => {
    setMessage(text);
    setMsgType(type);
    setTimeout(() => setMessage(''), 3000);
  };

  // Update form state when user types
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Add / Update form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editId) {
        // UPDATE existing item
        await updateItem(editId, formData);
        showMessage('Item updated successfully!', 'success');
        setEditId(null);
      } else {
        // ADD new item
        await addItem(formData);
        showMessage('Item added successfully!', 'success');
      }

      setFormData(emptyForm); // Reset form
      fetchItems();           // Refresh items list
    } catch (err) {
      showMessage(err.response?.data?.message || 'Operation failed', 'error');
    }

    setLoading(false);
  };

  // Populate form with item data for editing
  const handleEdit = (item) => {
    setEditId(item._id);
    setFormData({
      itemName: item.itemName,
      description: item.description,
      type: item.type,
      location: item.location,
      date: item.date ? item.date.substring(0, 10) : '', // Format date
      contactInfo: item.contactInfo,
    });
    // Scroll to the form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete an item
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      await deleteItem(id);
      showMessage('Item deleted successfully!', 'success');
      fetchItems();
    } catch (err) {
      showMessage(err.response?.data?.message || 'Delete failed', 'error');
    }
  };

  // Search items by name
  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      // If empty search, load all items
      return fetchItems();
    }

    try {
      const res = await searchItems(searchQuery);
      setItems(res.data);
    } catch (err) {
      showMessage('Search failed', 'error');
    }
  };

  // Cancel editing and reset form
  const handleCancelEdit = () => {
    setEditId(null);
    setFormData(emptyForm);
  };

  return (
    <div>
      {/* Top Navigation Bar */}
      <Navbar />

      <div className="container mt-4">
        {/* Dashboard Header */}
        <div className="dashboard-header">
          <h4>📋 Dashboard</h4>
          <small>Manage Lost & Found Items</small>
        </div>

        {/* Status Message */}
        {message && (
          <div className={`alert-msg ${msgType === 'error' ? 'alert-error' : 'alert-success'}`}>
            {message}
          </div>
        )}

        {/* ---- ADD / EDIT ITEM FORM ---- */}
        <div className="card p-4 mb-4">
          <h5 className="mb-3">{editId ? '✏️ Edit Item' : '➕ Report Lost / Found Item'}</h5>
          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* Item Name */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Item Name *</label>
                <input
                  type="text"
                  name="itemName"
                  className="form-control"
                  placeholder="e.g., Blue Water Bottle"
                  value={formData.itemName}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Type: Lost or Found */}
              <div className="col-md-6 mb-3">
                <label className="form-label">Type *</label>
                <select
                  name="type"
                  className="form-select"
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  <option value="Lost">Lost</option>
                  <option value="Found">Found</option>
                </select>
              </div>

              {/* Description */}
              <div className="col-md-12 mb-3">
                <label className="form-label">Description *</label>
                <textarea
                  name="description"
                  className="form-control"
                  rows="2"
                  placeholder="Describe the item..."
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Location */}
              <div className="col-md-4 mb-3">
                <label className="form-label">Location *</label>
                <input
                  type="text"
                  name="location"
                  className="form-control"
                  placeholder="e.g., Library, Canteen"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Date */}
              <div className="col-md-4 mb-3">
                <label className="form-label">Date *</label>
                <input
                  type="date"
                  name="date"
                  className="form-control"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Contact Info */}
              <div className="col-md-4 mb-3">
                <label className="form-label">Contact Info *</label>
                <input
                  type="text"
                  name="contactInfo"
                  className="form-control"
                  placeholder="Phone or email"
                  value={formData.contactInfo}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Submit and Cancel buttons */}
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : editId ? 'Update Item' : 'Add Item'}
            </button>

            {editId && (
              <button type="button" className="btn btn-secondary" onClick={handleCancelEdit}>
                Cancel
              </button>
            )}
          </form>
        </div>

        {/* ---- SEARCH BAR ---- */}
        <div className="card p-3 mb-4">
          <form onSubmit={handleSearch} className="d-flex gap-2">
            <input
              type="text"
              className="form-control"
              placeholder="🔍 Search items by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="btn btn-outline-primary">
              Search
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => { setSearchQuery(''); fetchItems(); }}
            >
              Clear
            </button>
          </form>
        </div>

        {/* ---- ITEMS LIST ---- */}
        <h5 className="mb-3">
          📦 All Items ({items.length})
        </h5>

        {items.length === 0 ? (
          <div className="text-center text-muted py-4">
            <p>No items found. Be the first to report one!</p>
          </div>
        ) : (
          <div className="row">
            {items.map((item) => (
              <div className="col-md-6 col-lg-4" key={item._id}>
                <div className="card item-card p-3">
                  {/* Item type badge */}
                  <div className="mb-2">
                    <span className={item.type === 'Lost' ? 'badge-lost' : 'badge-found'}>
                      {item.type}
                    </span>
                  </div>

                  <h6 className="mb-1">
                    <strong>{item.itemName}</strong>
                  </h6>
                  <p className="text-muted mb-1" style={{ fontSize: '0.85rem' }}>
                    {item.description}
                  </p>
                  <small>📍 {item.location}</small><br />
                  <small>📅 {new Date(item.date).toLocaleDateString()}</small><br />
                  <small>📞 {item.contactInfo}</small><br />
                  <small className="text-muted">
                    Posted by: {item.user?.name || 'Unknown'}
                  </small>

                  {/* Edit/Delete buttons (only for the item's owner) */}
                  {user && item.user && user.id === item.user._id && (
                    <div className="mt-2 d-flex gap-2">
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
