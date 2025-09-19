import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginStart, loginSuccess, loginFailure, logout } from '../slices/authSlice';

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(loginStart());
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        throw new Error('Login failed');
      }
      
      const userData = await response.json();
      dispatch(loginSuccess(userData));
      return userData;
    } catch (error) {
      const errorMessage = error.message || 'Login failed';
      dispatch(loginFailure(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for signup
export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      dispatch(loginStart());
      
      // Replace this with your actual API call
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        throw new Error('Signup failed');
      }
      
      const newUser = await response.json();
      dispatch(loginSuccess(newUser));
      return newUser;
    } catch (error) {
      const errorMessage = error.message || 'Signup failed';
      dispatch(loginFailure(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for logout
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { dispatch }) => {
    try {
      // Replace this with your actual API call if needed
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
      
      dispatch(logout());
    } catch (error) {
      // Even if logout fails on server, we still logout locally
      dispatch(logout());
    }
  }
);
