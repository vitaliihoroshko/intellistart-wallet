import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

import * as api from 'api/api-helper';

const middleware = getDefaultMiddleware => {
  return getDefaultMiddleware({
    thunk: { extraArgument: api },
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  });
};

export default middleware;
