import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import '../../styles/university/UniversityMatcher.css';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80'; // University campus

const UniversityMatcher = () => {
  const [filters, setFilters] = useState({
    state: '',
    schoolType: '',
    program: '',
    tuitionRange: '',
    size: '',
    admissionRate: ''
  });

  const [universities, setUniversities] = useState([]);
  const [filteredUniversities, setFilteredUniversities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const states = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  const schoolTypes = ['Public', 'Private', 'For-Profit'];
  const programs = ['Computer Science', 'Engineering', 'Business', 'Medicine', 'Arts', 'Humanities'];
  const tuitionRanges = ['< $10,000', '$10,000 - $20,000', '$20,000 - $30,000', '> $30,000'];
  const sizes = ['Small (< 5,000)', 'Medium (5,000 - 15,000)', 'Large (> 15,000)'];
  const admissionRates = ['< 20%', '20% - 40%', '40% - 60%', '60% - 80%', '> 80%'];

  useEffect(() => {
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await api.searchColleges({
        fields: 'id,school.name,school.city,school.state,school.school_url,school.ownership,latest.student.size,latest.admissions.admission_rate.overall,latest.cost.tuition.in_state,latest.cost.tuition.out_of_state,latest.completion.rate_4yr_150nt,latest.earnings.10_yrs_after_entry.median,latest.academics.programs.cip_4_digit',
        per_page: 100
      });

      const formattedUniversities = response.data.results.map(school => ({
        id: school.id,
        name: school['school.name'],
        city: school['school.city'],
        state: school['school.state'],
        website: school['school.school_url'],
        schoolType: school['school.ownership'] === 1 ? 'Public' : school['school.ownership'] === 2 ? 'Private' : 'For-Profit',
        studentSize: school['latest.student.size'],
        admissionRate: school['latest.admissions.admission_rate.overall'],
        tuition: {
          inState: school['latest.cost.tuition.in_state'],
          outOfState: school['latest.cost.tuition.out_of_state']
        },
        completionRate: school['latest.completion.rate_4yr_150nt'],
        earnings: {
          median: school['latest.earnings.10_yrs_after_entry.median']
        },
        programs: Array.isArray(school['latest.academics.programs.cip_4_digit'])
          ? school['latest.academics.programs.cip_4_digit'].map(p => ({ title: p.title }))
          : []
      }));

      setUniversities(formattedUniversities);
      setFilteredUniversities(formattedUniversities);
    } catch (err) {
      setError('Failed to fetch universities. Please try again later.');
      console.error('Error fetching universities:', err);
    } finally {
      setIsLoading(false);
    }
  };

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
          switch (key) {
            case 'state':
              return university.state && university.state.toUpperCase() === value.toUpperCase();
            case 'schoolType':
              return university.schoolType && university.schoolType.toLowerCase() === value.toLowerCase();
            case 'program':
              return Array.isArray(university.programs) && university.programs.some(
                p => p.title && p.title.toLowerCase() === value.toLowerCase()
              );
            case 'tuitionRange':
              const tuition = university.tuition.inState || university.tuition.outOfState;
              return getTuitionRange(tuition) === value;
            case 'size':
              return getSizeRange(university.studentSize) === value;
            case 'admissionRate':
              return getAdmissionRateRange(university.admissionRate) === value;
            default:
              return true;
          }
        });
      }
    });

    setFilteredUniversities(filtered);
  };

  const getTuitionRange = (tuition) => {
    if (!tuition) return '';
    if (tuition < 10000) return '< $10,000';
    if (tuition < 20000) return '$10,000 - $20,000';
    if (tuition < 30000) return '$20,000 - $30,000';
    return '> $30,000';
  };

  const getSizeRange = (size) => {
    if (!size) return '';
    if (size < 5000) return 'Small (< 5,000)';
    if (size < 15000) return 'Medium (5,000 - 15,000)';
    return 'Large (> 15,000)';
  };

  const getAdmissionRateRange = (rate) => {
    if (!rate) return '';
    const percentage = rate * 100;
    if (percentage < 20) return '< 20%';
    if (percentage < 40) return '20% - 40%';
    if (percentage < 60) return '40% - 60%';
    if (percentage < 80) return '60% - 80%';
    return '> 80%';
  };

  const resetFilters = () => {
    setFilters({
      state: '',
      schoolType: '',
      program: '',
      tuitionRange: '',
      size: '',
      admissionRate: ''
    });
    setFilteredUniversities(universities);
  };

  return (
    <div className="matcher-page">
      <div className="matcher-hero" style={{ backgroundImage: `url(${HERO_IMAGE})` }}>
        <div className="matcher-hero-overlay" />
        <div className="matcher-hero-content">
          <h1>Find Your Perfect University Match</h1>
        </div>
      </div>

      <div className="matcher-container">
        <div className="filters-section">
          <h2>Filter Options</h2>
          <div className="filters-grid">
            <div className="filter-group">
              <label htmlFor="state"><i className="fas fa-map-marker-alt filter-icon"></i> State</label>
              <select
                id="state"
                name="state"
                value={filters.state}
                onChange={handleFilterChange}
              >
                <option value="">Any State</option>
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="schoolType"><i className="fas fa-university filter-icon"></i> School Type</label>
              <select
                id="schoolType"
                name="schoolType"
                value={filters.schoolType}
                onChange={handleFilterChange}
              >
                <option value="">Any Type</option>
                {schoolTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="program"><i className="fas fa-book filter-icon"></i> Program</label>
              <select
                id="program"
                name="program"
                value={filters.program}
                onChange={handleFilterChange}
              >
                <option value="">Any Program</option>
                {programs.map(program => (
                  <option key={program} value={program}>{program}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="tuitionRange"><i className="fas fa-dollar-sign filter-icon"></i> Tuition Range</label>
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
              <label htmlFor="size"><i className="fas fa-users filter-icon"></i> University Size</label>
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
              <label htmlFor="admissionRate"><i className="fas fa-percentage filter-icon"></i> Admission Rate</label>
              <select
                id="admissionRate"
                name="admissionRate"
                value={filters.admissionRate}
                onChange={handleFilterChange}
              >
                <option value="">Any Rate</option>
                {admissionRates.map(rate => (
                  <option key={rate} value={rate}>{rate}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="filter-buttons">
            <button onClick={applyFilters} className="apply-button">Apply Filters</button>
            <button onClick={resetFilters} className="reset-button">Reset Filters</button>
          </div>
        </div>

        <div className="results-section results-bg">
          <h2>Matching Universities</h2>
          {isLoading ? (
            <div className="loading">Loading universities...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : filteredUniversities.length > 0 ? (
            <div className="universities-grid">
              {filteredUniversities.map(university => (
                <div key={university.id} className="university-card">
                  <h3>{university.name}</h3>
                  <div className="university-details">
                    <p><strong>Location:</strong> {university.city}, {university.state}</p>
                    <p><strong>Type:</strong> {university.schoolType}</p>
                    <p><strong>Size:</strong> {university.studentSize?.toLocaleString()} students</p>
                    <p><strong>Admission Rate:</strong> {(university.admissionRate * 100).toFixed(1)}%</p>
                    <p><strong>In-State Tuition:</strong> ${university.tuition.inState?.toLocaleString()}</p>
                    <p><strong>Out-of-State Tuition:</strong> ${university.tuition.outOfState?.toLocaleString()}</p>
                    <p><strong>Completion Rate:</strong> {(university.completionRate * 100).toFixed(1)}%</p>
                    {university.earnings.median && (
                      <p><strong>Median Earnings (10 years):</strong> ${university.earnings.median.toLocaleString()}</p>
                    )}
                  </div>
                  <div className="university-actions">
                    <a href={university.website} target="_blank" rel="noopener noreferrer" className="view-details-button">
                      Visit Website
                    </a>
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
    </div>
  );
};

export default UniversityMatcher;
