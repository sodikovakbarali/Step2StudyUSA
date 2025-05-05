import React from 'react';
import '../styles/Account.css';

const Account = () => {
  return (
    <div className="account-container">
      <h1 className="account-title">My Account</h1>
      <div className="account-section">
        <h2>Saved Universities</h2>
        <div className="placeholder">You haven't saved any universities yet.</div>
      </div>
      <div className="account-section">
        <h2>My Comments</h2>
        <div className="placeholder">You haven't left any comments yet.</div>
      </div>
    </div>
  );
};

export default Account; 