import axios from 'axios';

export const client = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

client.interceptors.request.use((config) => {
  config.headers['Authorization'] = localStorage.getItem('accessToken');
  return config;
});
