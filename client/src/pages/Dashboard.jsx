import React, { useState, useEffect } from 'react';
import '../styles/Dashboard.css';
import '../styles/shared/Headings.css';

const Dashboard = () => {
  const [matches, setMatches] = useState([]);
  const [savedUniversities, setSavedUniversities] = useState([]);

  useEffect(() => {
    // TODO: Fetch user's matches and saved universities from API
    // This is a placeholder for actual API calls
    const mockMatches = [
      { id: 1, name: 'University of Example', matchScore: 95 },
      { id: 2, name: 'Tech Institute', matchScore: 88 },
      { id: 3, name: 'Global University', matchScore: 82 }
    ];
    setMatches(mockMatches);
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="page-heading">Your Dashboard</h1>
      
      <section className="matches-section">
        <h2 className="section-heading">Your Top Matches</h2>
        <div className="matches-grid">
          {matches.map(match => (
            <div key={match.id} className="match-card">
              <h3>{match.name}</h3>
              <div className="match-score">
                Match Score: {match.matchScore}%
              </div>
              <button className="view-details-button">View Details</button>
            </div>
          ))}
        </div>
      </section>

      <section className="saved-section">
        <h2 className="section-heading">Saved Universities</h2>
        {savedUniversities.length > 0 ? (
          <div className="saved-grid">
            {savedUniversities.map(university => (
              <div key={university.id} className="saved-card">
                <h3>{university.name}</h3>
                <button className="remove-button">Remove</button>
              </div>
            ))}
          </div>
        ) : (
          <p>You haven't saved any universities yet.</p>
        )}
      </section>

      <section className="preferences-section">
        <h2 className="section-heading">Your Preferences</h2>
        <button className="edit-preferences-button">Edit Preferences</button>
      </section>
    </div>
  );
};

export default Dashboard;
