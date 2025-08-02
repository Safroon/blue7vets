// src/api/setupAxios.js
import axios from 'axios';

axios.defaults.baseURL = 'https://blue7vets-backend.onrender.com/api';

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
