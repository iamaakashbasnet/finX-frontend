import { configureStore } from '@reduxjs/toolkit';

import userReduer from './user/userSlice';

export const store = configureStore({
  reducer: {
    user: userReduer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
