import axios from 'axios';

// API 클라이언트 생성
export const client = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 쿠키 자동 전송을 위해 필수
});

client.interceptors.request.use((config) => {
  config.headers['Authorization'] = localStorage.getItem('accessToken');
  return config;
});
