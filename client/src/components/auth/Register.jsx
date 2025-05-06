import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/auth/Register.css';
import '../../styles/shared/Headings.css';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    academicLevel: '',
    interests: []
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const academicLevels = [
    'High School',
    'Undergraduate',
    'Graduate',
    'Postgraduate'
  ];

  const interests = [
    'Computer Science',
    'Engineering',
    'Business',
    'Medicine',
    'Arts',
    'Humanities',
    'Social Sciences',
    'Natural Sciences'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInterestChange = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.academicLevel) {
      newErrors.academicLevel = 'Academic level is required';
    }
    if (formData.interests.length === 0) {
      newErrors.interests = 'Please select at least one interest';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({}); // Clear previous errors

    try {
      console.log('Sending registration request:', {
        name: formData.name,
        email: formData.email,
        academicLevel: formData.academicLevel,
        interests: formData.interests
      });

      const response = await fetch('http://localhost:5001/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          academicLevel: formData.academicLevel,
          interests: formData.interests,
        }),
        credentials: 'include'
      });

      const data = await response.json();
      console.log('Registration response:', data);

      if (!response.ok) {
        throw new Error(data.msg || data.error || 'Registration failed');
      }

      // Store the token and user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Update auth context
      await login(data.token);
      
      console.log('Registration successful, redirecting to dashboard...');
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ 
        submit: error.message || 'An unexpected error occurred during registration. Please try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="page-heading">Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? 'error' : ''}
            />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="academicLevel">Academic Level</label>
            <select
              id="academicLevel"
              name="academicLevel"
              value={formData.academicLevel}
              onChange={handleChange}
              className={errors.academicLevel ? 'error' : ''}
            >
              <option value="">Select your academic level</option>
              {academicLevels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
            {errors.academicLevel && <span className="error-message">{errors.academicLevel}</span>}
          </div>

          <div className="form-group">
            <label>Interests</label>
            <div className="interests-grid">
              {interests.map(interest => (
                <label key={interest} className="interest-checkbox">
                  <input
                    type="checkbox"
                    checked={formData.interests.includes(interest)}
                    onChange={() => handleInterestChange(interest)}
                  />
                  {interest}
                </label>
              ))}
            </div>
            {errors.interests && <span className="error-message">{errors.interests}</span>}
          </div>

          {errors.submit && <div className="submit-error">{errors.submit}</div>}

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-links">
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
