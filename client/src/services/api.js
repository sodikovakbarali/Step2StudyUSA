import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const api = {
  // User related
  registerUser: (userData) => axios.post(`${API_URL}/users/register`, userData),
  loginUser: (credentials) => axios.post(`${API_URL}/users/login`, credentials),
  
  // University related
  getUniversities: () => axios.get(`${API_URL}/universities`),
  matchUniversities: (criteria) => axios.post(`${API_URL}/universities/match`, criteria),
  
  // Forum related
  getPosts: () => axios.get(`${API_URL}/forum`),
  createPost: (postData) => axios.post(`${API_URL}/forum`, postData),
  
  // Scholarship related
  getScholarships: () => axios.get(`${API_URL}/scholarships`),
  matchScholarships: (criteria) => axios.post(`${API_URL}/scholarships/match`, criteria)
};

export default api;