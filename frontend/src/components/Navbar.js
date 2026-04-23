// src/components/Navbar.js
// Navigation bar shown on the dashboard page

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  // Get logged-in user's name from localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  // Logout: clear localStorage and go to login page
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <span className="navbar-brand">🔍 Lost & Found System</span>
      <div className="d-flex align-items-center gap-3">
        {/* Show logged-in user's name */}
        {user && (
          <span className="text-white">
            Welcome, <strong>{user.name}</strong>
          </span>
        )}
        {/* Logout button */}
        <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
