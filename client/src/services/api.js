import axios from 'axios';

const API_URL = 'http://localhost:4500/api';
const COLLEGE_SCORECARD_API_URL = 'https://api.data.gov/ed/collegescorecard/v1/schools';
const COLLEGE_SCORECARD_API_KEY = 'XtZXOnicobSWJU7EVskCxsFg9btNaZZUEhgoDsfr';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { 'x-auth-token': token } : {};
};

export const api = {
  // User related
  registerUser: (userData) => axios.post(`${API_URL}/users/register`, userData),
  loginUser: (credentials) => axios.post(`${API_URL}/users/login`, credentials),

  // University related
  getUniversities: () => axios.get(`${API_URL}/universities`),
  matchUniversities: (criteria) => axios.post(`${API_URL}/universities/match`, criteria),

  // College Scorecard API
  searchColleges: (params) => axios.get(COLLEGE_SCORECARD_API_URL, {
    params: {
      api_key: COLLEGE_SCORECARD_API_KEY,
      ...params
    }
  }),

  // Save university to user favorites
  saveUniversity: (university) => axios.post(`${API_URL}/universities/save`, university, { headers: getAuthHeaders() }),

  // Get user profile
  getProfile: () => axios.get(`${API_URL}/users/profile`, { headers: getAuthHeaders() }),

  // Forum related
  getPosts: () => axios.get(`${API_URL}/forum`),
  createPost: (postData) => axios.post(`${API_URL}/forum`, postData),

  // Scholarship related
  getScholarships: () => axios.get(`${API_URL}/scholarships`),
  matchScholarships: (criteria) => axios.post(`${API_URL}/scholarships/match`, criteria)
};

export default api;