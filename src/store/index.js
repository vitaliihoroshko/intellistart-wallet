import { configureStore } from '@reduxjs/toolkit';

import sessionSliceReducer from './slices/sessionSlice';

const store = configureStore({
  reducer: {
    session: sessionSliceReducer,
  },
});

export default store;
