// src/services/api.ts

import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

// URL base del backend
const BASE_URL = 'https://proyecto-de-software-backend.onrender.com/api/v2'; 

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para inyectar el token JWT
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('jwtToken');

    if (token) {
      // Inyectar el token en el encabezado Authorization
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;