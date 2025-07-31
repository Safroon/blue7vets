import axios from 'axios';

const API = axios.create({
  baseURL: 'http://192.168.29.8:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;
