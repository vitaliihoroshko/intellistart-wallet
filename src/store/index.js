import { configureStore } from '@reduxjs/toolkit';

import sessionReducer from './slices/session';
import * as api from 'api/api-helper';

const store = configureStore({
  reducer: {
    session: sessionReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ thunk: { extraArgument: api } }),
});

export default store;