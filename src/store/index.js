import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import propertyReducer from './propertySlice';
import toastReducer from './toastSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    property: propertyReducer,
    toast: toastReducer,
  },
});
