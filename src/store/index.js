import { configureStore } from '@reduxjs/toolkit';

import sessionReducer from './slices/session';

const store = configureStore({
  reducer: {
    session: sessionReducer,
  },
});

export default store;
