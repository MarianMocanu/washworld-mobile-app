import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import eventReducer from '../features/stacks/event/screens/eventSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    event: eventReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
