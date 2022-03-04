import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

import { GetDefaultMiddleware } from './types';
import * as api from 'api/api-helper';

const middleware = (getDefaultMiddleware: GetDefaultMiddleware) => {
  return getDefaultMiddleware({
    thunk: { extraArgument: api },
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  });
};

export default middleware;
