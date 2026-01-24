import axios from 'axios';

// 1. Crear la conexión usando la dirección que pusimos en el .env
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Interceptor: Antes de enviar cualquier mensaje, pega el Token de seguridad si lo tenemos
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;