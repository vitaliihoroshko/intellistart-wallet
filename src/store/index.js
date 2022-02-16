import { configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

import rootReducer from './rootReducer';
import persistConfig from './persistConfig';
import middleware from './middleware';

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware,
});

export default store;
