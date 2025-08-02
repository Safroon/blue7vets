import axios from 'axios';

const BASE_URL = 'https://blue7vets-backend.onrender.com/api/auth';

export const loginUser = async credentials => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' };
  }
};
