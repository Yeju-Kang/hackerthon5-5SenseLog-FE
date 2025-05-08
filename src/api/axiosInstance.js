// src/api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ✅ 이 설정으로 모든 요청에 쿠키 자동 포함
});

export default axiosInstance;
