import storage from 'redux-persist/lib/storage';
import createFilter from 'redux-persist-transform-filter';

const saveTokenFilter = createFilter('session', ['token']);

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['session'],
  transforms: [saveTokenFilter],
};

export default persistConfig;
