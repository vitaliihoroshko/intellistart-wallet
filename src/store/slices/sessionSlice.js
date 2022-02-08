import { createSlice } from '@reduxjs/toolkit';

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
    signUserIn(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuth = true;
      if (state.error) state.error = null;
    },

    signUserOut() {
      return initialState;
    },

    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const sessionSliceActions = sessionSlice.actions;

export default sessionSlice.reducer;
