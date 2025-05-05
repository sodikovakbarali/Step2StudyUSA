import React from 'react';
import { Link } from 'react-router-dom';
<<<<<<< Updated upstream
import '../../styles/shared/Navbar.css';
=======
import { useAuth } from '../../context/AuthContext';
>>>>>>> Stashed changes

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="navbar">
<<<<<<< Updated upstream
      <div className="navbar-logo">UniMatch</div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/matcher">University Matcher</Link>
        <Link to="/forum">Forum</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
=======
      <h1>UniMatch</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/matcher">University Matcher</Link></li>
        <li><Link to="/forum">Forum</Link></li>
        {isAuthenticated ? (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><button onClick={logout} className="logout-button">Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
>>>>>>> Stashed changes
    </nav>
  );
};

export default Navbar;