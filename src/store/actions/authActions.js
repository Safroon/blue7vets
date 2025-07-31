import { loginStart, loginSuccess, loginFailure } from '../slices/authSlice';
import { loginUser } from '../../api/authAPI';

export const login = credentials => async dispatch => {
  dispatch(loginStart());
  try {
    const data = await loginUser(credentials);
    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(loginFailure(error.message || 'Login failed'));
  }
};
