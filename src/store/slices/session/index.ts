import { createSlice, ActionReducerMapBuilder } from '@reduxjs/toolkit';

import { SessionState, Action, FulfilledAction, RejectedAction } from 'store/types';
import { autoSignIn } from './actions';

const initialState: SessionState = {
  token: null,
  user: null,
  isAuth: false,
  error: null,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    signIn(state: SessionState, action: Action<Pick<SessionState, 'token' | 'user'>>): void {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuth = true;
      if (state.error) state.error = null;
    },

    signOut(): SessionState {
      return initialState;
    },

    setError(state: SessionState, action: Action<string>): void {
      state.error = action.payload;
    },
  },

  extraReducers(builder: ActionReducerMapBuilder<SessionState>): void {
    builder.addCase(
      autoSignIn.fulfilled,
      (
        state: SessionState,
        action: FulfilledAction<Partial<Omit<SessionState, 'isAuth'>>>,
      ): void => {
        state.token = action.payload?.token!;
        state.user = action.payload?.user!;
        state.isAuth = true;
        if (state.error) state.error = null;
      },
    );

    builder.addCase(autoSignIn.rejected, (state: SessionState, action: RejectedAction): void => {
      state.error = action.payload as string;
    });
  },
});

const { reducer, actions } = sessionSlice;

export const { signIn, signOut, setError } = actions;

export default reducer;
