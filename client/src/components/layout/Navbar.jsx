import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/shared/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">UniMatch</div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/matcher">University Matcher</Link>
        <Link to="/forum">Forum</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;