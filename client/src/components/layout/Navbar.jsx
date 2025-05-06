import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/shared/Navbar.css';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate('/');
  };

  const handleAccountClick = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      navigate('/account');
    } else {
      navigate('/login');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">UniMatch</div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/matcher">University Matcher</Link>
        <Link to="/forum">Forum</Link>
        <Link to="#" className="account-link" onClick={handleAccountClick}>Account</Link>
        {isAuthenticated ? (
          <div className="user-menu" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div 
              className="user-profile" 
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <span className="user-name">{user?.name || 'User'}</span>
              <div className="profile-icon">
                <i className="fas fa-user"></i>
              </div>
            </div>
            <button onClick={handleLogout} className="auth-link logout-button" style={{ marginLeft: '0.5rem' }}>Logout</button>
            {showDropdown && (
              <div className="dropdown-menu">
                <Link to="/dashboard" onClick={() => setShowDropdown(false)}>
                  <i className="fas fa-tachometer-alt"></i> Dashboard
                </Link>
                <Link to="/profile" onClick={() => setShowDropdown(false)}>
                  <i className="fas fa-user-circle"></i> Profile
                </Link>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" className="auth-link">Login</Link>
            <Link to="/register" className="auth-link register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;