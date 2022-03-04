import { combineReducers } from '@reduxjs/toolkit';

import sessionReducer from './slices/session';
import globalReducer from './slices/global';
import financeReducer from './slices/finance';

const rootReducer = combineReducers({
  session: sessionReducer,
  global: globalReducer,
  finance: financeReducer,
});

export default rootReducer;
