import axios from 'axios';

const API = axios.create({
  baseURL: 'http://192.168.1.104:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;
