import { createSlice } from '@reduxjs/toolkit';

import { autoSignIn } from './actions';

const initialState = {
  token: null,
  user: null,
  isAuth: false,
  error: null,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    signIn(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuth = true;
      if (state.error) state.error = null;
    },

    signOut() {
      return initialState;
    },

    setError(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(autoSignIn.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuth = true;
      if (state.error) state.error = null;
    });

    builder.addCase(autoSignIn.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

const { reducer, actions } = sessionSlice;

export const { signIn, signOut, setError } = actions;

export default reducer;
