import React, { useState, useEffect } from 'react';
import '../../styles/university/UniversityMatcher.css';

const UniversityMatcher = () => {
  const [filters, setFilters] = useState({
    location: '',
    academicLevel: '',
    fieldOfStudy: '',
    tuitionRange: '',
    size: '',
    ranking: ''
  });

  const [universities, setUniversities] = useState([]);
  const [filteredUniversities, setFilteredUniversities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const locations = ['North America', 'Europe', 'Asia', 'Australia', 'Africa'];
  const academicLevels = ['Undergraduate', 'Graduate', 'Postgraduate'];
  const fieldsOfStudy = ['Computer Science', 'Engineering', 'Business', 'Medicine', 'Arts', 'Humanities'];
  const tuitionRanges = ['< $10,000', '$10,000 - $20,000', '$20,000 - $30,000', '> $30,000'];
  const sizes = ['Small (< 5,000)', 'Medium (5,000 - 15,000)', 'Large (> 15,000)'];
  const rankings = ['Top 10', 'Top 50', 'Top 100', 'Top 200'];

  useEffect(() => {
    // TODO: Replace with actual API call
    const mockUniversities = [
      {
        id: 1,
        name: 'Tech University',
        location: 'North America',
        academicLevels: ['Undergraduate', 'Graduate'],
        fieldsOfStudy: ['Computer Science', 'Engineering'],
        tuition: '$25,000',
        size: 'Medium (5,000 - 15,000)',
        ranking: 'Top 50',
        matchScore: 95
      },
      {
        id: 2,
        name: 'Global University',
        location: 'Europe',
        academicLevels: ['Undergraduate', 'Graduate', 'Postgraduate'],
        fieldsOfStudy: ['Business', 'Humanities'],
        tuition: '$15,000',
        size: 'Large (> 15,000)',
        ranking: 'Top 100',
        matchScore: 88
      }
    ];
    setUniversities(mockUniversities);
    setFilteredUniversities(mockUniversities);
    setIsLoading(false);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const applyFilters = () => {
    let filtered = [...universities];

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter(university => {
          if (key === 'academicLevel') {
            return university.academicLevels.includes(value);
          } else if (key === 'fieldOfStudy') {
            return university.fieldsOfStudy.includes(value);
          } else {
            return university[key] === value;
          }
        });
      }
    });

    setFilteredUniversities(filtered);
  };

  const resetFilters = () => {
    setFilters({
      location: '',
      academicLevel: '',
      fieldOfStudy: '',
      tuitionRange: '',
      size: '',
      ranking: ''
    });
    setFilteredUniversities(universities);
  };

  return (
    <div className="matcher-container">
      <h1>Find Your Perfect University Match</h1>

      <div className="filters-section">
        <h2>Filter Options</h2>
        <div className="filters-grid">
          <div className="filter-group">
            <label htmlFor="location">Location</label>
            <select
              id="location"
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
            >
              <option value="">Any Location</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="academicLevel">Academic Level</label>
            <select
              id="academicLevel"
              name="academicLevel"
              value={filters.academicLevel}
              onChange={handleFilterChange}
            >
              <option value="">Any Level</option>
              {academicLevels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="fieldOfStudy">Field of Study</label>
            <select
              id="fieldOfStudy"
              name="fieldOfStudy"
              value={filters.fieldOfStudy}
              onChange={handleFilterChange}
            >
              <option value="">Any Field</option>
              {fieldsOfStudy.map(field => (
                <option key={field} value={field}>{field}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="tuitionRange">Tuition Range</label>
            <select
              id="tuitionRange"
              name="tuitionRange"
              value={filters.tuitionRange}
              onChange={handleFilterChange}
            >
              <option value="">Any Range</option>
              {tuitionRanges.map(range => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="size">University Size</label>
            <select
              id="size"
              name="size"
              value={filters.size}
              onChange={handleFilterChange}
            >
              <option value="">Any Size</option>
              {sizes.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="ranking">Ranking</label>
            <select
              id="ranking"
              name="ranking"
              value={filters.ranking}
              onChange={handleFilterChange}
            >
              <option value="">Any Ranking</option>
              {rankings.map(ranking => (
                <option key={ranking} value={ranking}>{ranking}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="filter-buttons">
          <button onClick={applyFilters} className="apply-button">Apply Filters</button>
          <button onClick={resetFilters} className="reset-button">Reset Filters</button>
        </div>
      </div>

      <div className="results-section">
        <h2>Matching Universities</h2>
        {isLoading ? (
          <div className="loading">Loading universities...</div>
        ) : filteredUniversities.length > 0 ? (
          <div className="universities-grid">
            {filteredUniversities.map(university => (
              <div key={university.id} className="university-card">
                <h3>{university.name}</h3>
                <div className="match-score">
                  Match Score: {university.matchScore}%
                </div>
                <div className="university-details">
                  <p><strong>Location:</strong> {university.location}</p>
                  <p><strong>Tuition:</strong> {university.tuition}</p>
                  <p><strong>Size:</strong> {university.size}</p>
                  <p><strong>Ranking:</strong> {university.ranking}</p>
                </div>
                <div className="university-actions">
                  <button className="view-details-button">View Details</button>
                  <button className="save-button">Save</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            No universities match your current filters. Try adjusting your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default UniversityMatcher;
