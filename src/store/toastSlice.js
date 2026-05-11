import { createSlice } from '@reduxjs/toolkit';

const createToastId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
};

const toastSlice = createSlice({
  name: 'toast',
  initialState: {
    toasts: [],
  },
  reducers: {
    showToast(state, action) {
      const { message, type = 'success' } = action.payload;
      state.toasts.push({ id: createToastId(), message, type });
    },
    removeToast(state, action) {
      const id = action.payload;
      state.toasts = state.toasts.filter((toast) => toast.id !== id);
    },
  },
});

export const { showToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;
