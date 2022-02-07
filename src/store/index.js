import { configureStore } from '@reduxjs/toolkit';

import authSliceReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
  },
});

export default store;
