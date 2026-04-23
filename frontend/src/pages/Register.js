// src/pages/Register.js
// Registration page where new users can create an account

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/api';

const Register = () => {
  const navigate = useNavigate();

  // Form state for all fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // For showing error or success messages
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Update formData when user types in any field
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Call the register API
      const res = await registerUser(formData);

      // Save token and user info in localStorage
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      setSuccess('Registered successfully! Redirecting...');

      // Redirect to dashboard after 1.5 seconds
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      // Show error returned by backend
      setError(err.response?.data?.message || 'Registration failed');
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">
      <h2>📝 Register</h2>
      <p className="text-center text-muted mb-4">Create your account</p>

      {/* Error message */}
      {error && <div className="alert-msg alert-error">{error}</div>}

      {/* Success message */}
      {success && <div className="alert-msg alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        {/* Name field */}
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email field */}
        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password field */}
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>

      {/* Link to login */}
      <p className="text-center mt-3">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Register;
