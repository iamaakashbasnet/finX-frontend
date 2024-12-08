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
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.first_name = action.payload.first_name;
        state.last_name = action.payload.last_name;
      })
      .addCase(loginAsync.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const loginAsync = createAsyncThunk<UserState, { username: string; password: string }>(
  'user/loginAsync',
  async (formData) => {
    try {
      const res = await apiClient.post('/users/token/', formData);
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${res.data.at as string}`;

      const userRes = await apiClient.get<UserState>('users/request-user-data/');
      return userRes.data;
    } catch (err) {
      console.error('Something went wrong:', err);
      throw err;
    }
  }
);

export default userSlice.reducer;
