import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || '';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      window.location.href = `${import.meta.env.BASE_URL}login`;
    }
    return Promise.reject(error);
  }
);

// Auth
export const login = (email, password) =>
  apiClient.post('/api/auth/login', { email, password });

export const register = (data) =>
  apiClient.post('/api/auth/register', data);

// Public registrations
export const registerUser = (data) =>
  apiClient.post('/api/register/user', data);

export const registerScout = (data) =>
  apiClient.post('/api/register/scout', data);

// Admin
// Talents
export const getTalents = (params) =>
  apiClient.get('/api/talents', { params });

export const getTalent = (id) =>
  apiClient.get(`/api/talents/${id}`);

// Voivodeships
export const getVoivodeships = () =>
  apiClient.get('/api/voivodeships');

export const getVoivodeship = (code) =>
  apiClient.get(`/api/voivodeships/${code}`);

// Scout
export const getScoutMe = () =>
  apiClient.get('/api/scouts/me');

export const getScoutStats = () =>
  apiClient.get('/api/scouts/stats');

export default apiClient;
