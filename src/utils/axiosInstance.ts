import axios from 'axios';

// API 클라이언트 생성
export const client = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}`,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // 쿠키 자동 전송을 위해 필수
});


// 테스트용 쿠키 설정 함수
export const setTestAccessToken = () => {
    document.cookie = 'AccessToken=eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Imtha2FvIDM4ODA1MjA4NjQiLCJyb2xlIjoiUk9MRV9VU0VSIiwiZW1haWwiOiIwMTZ2aHNka2RsQG5hdmVyLmNvbSIsImlhdCI6MTczNzAwNTc3OCwiZXhwIjoxNzM3MDkyMTc4fQ.i2cBmQOPO-48I3kHc2dYPL_DM7eQh5D1I6z5qSB1iug; Path=/; Expires=Fri, 16 Jan 2026 06:38:08 GMT;'
};