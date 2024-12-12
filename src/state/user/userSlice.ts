import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import apiClient from 'api/apiClient';
import { UserState } from './UserTypes';

const initialState: UserState = {
  username: '',
  email: '',
  first_name: '',
  last_name: '',
  isAuthenticated: false,
  isLoading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /**
       * Login
       */
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAsync.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = true;
      })
      .addCase(loginAsync.rejected, (state) => {
        state.isLoading = false;
      })

      /**
       * Load User Data
       */
      .addCase(loadUserData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.first_name = action.payload.first_name;
        state.last_name = action.payload.last_name;
      })
      .addCase(loadUserData.rejected, (state) => {
        state.isLoading = false;
      })

      /**
       * Logout
       */
      .addCase(logoutAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.username = '';
        state.email = '';
        state.first_name = '';
        state.last_name = '';
      })
      .addCase(logoutAsync.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const loginAsync = createAsyncThunk<UserState, { username: string; password: string }>(
  'user/loginAsync',
  async (formData, thunkAPI) => {
    try {
      const res = await apiClient.post('/users/token/', formData);
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${res.data.at as string}`;
      await thunkAPI.dispatch(loadUserData());
      return res.data;
    } catch (err) {
      console.error('Something went wrong:', err);
      throw err;
    }
  }
);

export const loadUserData = createAsyncThunk('user/loadUserData', async () => {
  try {
    const userRes = await apiClient.get<UserState>('users/request-user-data/');
    return userRes.data;
  } catch (err) {
    console.error('Something went wrong:', err);
    throw err;
  }
});

export const logoutAsync = createAsyncThunk('user/logoutAsync', async () => {
  try {
    const res = await apiClient.post('/users/token/blacklist/');
    return res.data;
  } catch (err) {
    console.error('Something went wrong:', err);
    throw err;
  }
});

export default userSlice.reducer;
