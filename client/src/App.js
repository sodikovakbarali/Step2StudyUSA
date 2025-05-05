import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import './App.css';

// Import components
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import UniversityMatcher from './components/university/UniversityMatcher';
import Forum from './pages/Forum';
import UserProfile from './components/profile/UserProfile';
import Account from './pages/Account';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/matcher" element={<UniversityMatcher />} />
              <Route path="/forum" element={<Forum />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/account" element={<Account />} />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;