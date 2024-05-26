import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import eventReducer from '../features/stacks/event/screens/eventSlice';
import activeCarReducer from '../features/account/slices/activeCarSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    event: eventReducer,
    activeCar: activeCarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
