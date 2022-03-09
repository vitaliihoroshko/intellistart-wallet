import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

import { GetDefaultMiddleware } from './types';
import * as api from 'api/api-helper';
import { ApiMiddleware } from 'common/interfaces';

const middleware = (getDefaultMiddleware: GetDefaultMiddleware) => {
  return getDefaultMiddleware({
    thunk: { extraArgument: api as ApiMiddleware },
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  });
};

export default middleware;
