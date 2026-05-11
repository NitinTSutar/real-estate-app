import { createSlice } from '@reduxjs/toolkit';

const toastSlice = createSlice({
  name: 'toast',
  initialState: {
    toasts: [],
  },
  reducers: {
    showToast(state, action) {
      const { message, type = 'success' } = action.payload;
      state.toasts.push({ id: Date.now(), message, type });
    },
    removeToast(state, action) {
      const id = action.payload;
      state.toasts = state.toasts.filter((toast) => toast.id !== id);
    },
  },
});

export const { showToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;
