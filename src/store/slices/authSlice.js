import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null,
    session: {
      isAuth: false,
      error: null,
    },
  },
  reducers: {
    signUserIn(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.session.isAuth = true;
      if (state.session.error) state.session.error = null;
    },

    signUserOut(state) {
      state.token = null;
      state.user = null;
      state.session.isAuth = false;
    },

    setError(state, action) {
      state.session.error = action.payload;
    },
  },
});

export const authSliceActions = authSlice.actions;

export default authSlice.reducer;
