import { combineReducers } from '@reduxjs/toolkit';

import sessionReducer from './slices/session';
import globalReducer from './slices/global';

const rootReducer = combineReducers({
  session: sessionReducer,
  global: globalReducer,
});

export default rootReducer;
