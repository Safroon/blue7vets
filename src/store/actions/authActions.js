import axios from 'axios';
import { loginStart, loginSuccess, loginFailure } from '../slices/authSlice';

export const loginUser = (phone, password) => async dispatch => {
  dispatch(loginStart());
  try {
    const res = await axios.post('http://localhost:5000/api/auth/login', {
      phone,
      password,
    });
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure(error.response?.data?.message || 'Login failed'));
  }
};
