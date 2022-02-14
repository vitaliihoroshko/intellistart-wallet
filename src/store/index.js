import { configureStore } from '@reduxjs/toolkit';

import sessionReducer from './slices/session';
import globalReducer from './slices/global';
import * as api from 'api/api-helper';

const store = configureStore({
  reducer: {
    session: sessionReducer,
    global: globalReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ thunk: { extraArgument: api } }),
});

export default store;
