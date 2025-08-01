// src/api/setupAxios.js
import axios from 'axios';

axios.defaults.baseURL = 'http://192.168.1.104:5000/api'; // 👈 replace with actual IP if needed

// Interceptor for logging
axios.interceptors.request.use(config => {
  console.log(
    `🔹 [REQUEST] ${config.method?.toUpperCase()} ${config.url}`,
    config.data,
  );
  return config;
});

axios.interceptors.response.use(
  response => {
    console.log('✅ [RESPONSE]', response.data);
    return response;
  },
  error => {
    console.log('❌Response from api failed', error.data);
    return Promise.reject(error);
  },
);
