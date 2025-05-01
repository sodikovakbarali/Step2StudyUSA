import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>UniMatch</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/matcher">University Matcher</Link></li>
        <li><Link to="/forum">Forum</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;