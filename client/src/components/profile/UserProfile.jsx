import React, { useState, useEffect } from 'react';
import '../../styles/profile/UserProfile.css';
import '../../styles/shared/Headings.css';
import { api } from '../../services/api';

const UserProfile = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    academicLevel: '',
    interests: [],
    savedUniversities: [],
    preferences: {
      location: '',
      tuitionRange: '',
      size: '',
      ranking: ''
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        // Fetch user profile from backend
        const res = await api.getProfile();
        setUserData(res.data);
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePreferenceChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [name]: value
      }
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // await updateUserProfile(userData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="loading">Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1 className="page-heading">Your Profile</h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="edit-button"
        >
          {isEditing ? 'Cancel Editing' : 'Edit Profile'}
        </button>
      </div>

      <div className="profile-section">
        <h2 className="section-heading">Personal Information</h2>
        <div className="profile-grid">
          <div className="profile-field">
            <label>Name</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
              />
            ) : (
              <p>{userData.name}</p>
            )}
          </div>

          <div className="profile-field">
            <label>Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
              />
            ) : (
              <p>{userData.email}</p>
            )}
          </div>

          <div className="profile-field">
            <label>Academic Level</label>
            {isEditing ? (
              <select
                name="academicLevel"
                value={userData.academicLevel}
                onChange={handleInputChange}
              >
                <option value="High School">High School</option>
                <option value="Undergraduate">Undergraduate</option>
                <option value="Graduate">Graduate</option>
                <option value="Postgraduate">Postgraduate</option>
              </select>
            ) : (
              <p>{userData.academicLevel}</p>
            )}
          </div>
        </div>
      </div>

      <div className="profile-section">
        <h2>University Preferences</h2>
        <div className="profile-grid">
          <div className="profile-field">
            <label>Preferred Location</label>
            {isEditing ? (
              <select
                name="location"
                value={userData.preferences.location}
                onChange={handlePreferenceChange}
              >
                <option value="North America">North America</option>
                <option value="Europe">Europe</option>
                <option value="Asia">Asia</option>
                <option value="Australia">Australia</option>
                <option value="Africa">Africa</option>
              </select>
            ) : (
              <p>{userData.preferences.location}</p>
            )}
          </div>

          <div className="profile-field">
            <label>Tuition Range</label>
            {isEditing ? (
              <select
                name="tuitionRange"
                value={userData.preferences.tuitionRange}
                onChange={handlePreferenceChange}
              >
                <option value="< $10,000">{"< $10,000"}</option>
                <option value="$10,000 - $20,000">$10,000 - $20,000</option>
                <option value="$20,000 - $30,000">$20,000 - $30,000</option>
                <option value="> $30,000">{"> $30,000"}</option>
              </select>
            ) : (
              <p>{userData.preferences.tuitionRange}</p>
            )}
          </div>

          <div className="profile-field">
            <label>University Size</label>
            {isEditing ? (
              <select
                name="size"
                value={userData.preferences.size}
                onChange={handlePreferenceChange}
              >
                <option value="Small (< 5,000)">Small ({"< 5,000"})</option>
                <option value="Medium (5,000 - 15,000)">Medium (5,000 - 15,000)</option>
                <option value="Large (> 15,000)">Large ({"> 15,000"})</option>
              </select>
            ) : (
              <p>{userData.preferences.size}</p>
            )}
          </div>

          <div className="profile-field">
            <label>Ranking Preference</label>
            {isEditing ? (
              <select
                name="ranking"
                value={userData.preferences.ranking}
                onChange={handlePreferenceChange}
              >
                <option value="Top 10">Top 10</option>
                <option value="Top 50">Top 50</option>
                <option value="Top 100">Top 100</option>
                <option value="Top 200">Top 200</option>
              </select>
            ) : (
              <p>{userData.preferences.ranking}</p>
            )}
          </div>
        </div>
      </div>

      <div className="profile-section">
        <h2>Saved Universities</h2>
        <div className="saved-universities">
          {userData.savedUniversities && userData.savedUniversities.length > 0 ? (
            userData.savedUniversities.map(university => (
              <div key={university.id} className="saved-university-card">
                <h3>{university.name}</h3>
                <p><strong>Location:</strong> {university.city}, {university.state}</p>
                {university.website && (
                  <a href={university.website.startsWith('http') ? university.website : `https://${university.website}`}
                     target="_blank" rel="noopener noreferrer" className="view-details-button">
                    Visit Website
                  </a>
                )}
                {/* Add remove button if needed */}
              </div>
            ))
          ) : (
            <div className="placeholder">You haven't saved any universities yet.</div>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="profile-actions">
          <button onClick={handleSave} className="save-button">
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
