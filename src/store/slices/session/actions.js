import { createAsyncThunk } from '@reduxjs/toolkit';

import { getCurrentUser } from 'api/api-helper';
import { signIn, signOut, setError } from '.';
import { setIsLoading } from '../global';

export const signUserUp = (signUpDto, validationCallback) => {
  return async (dispatch, _, api) => {
    try {
      const { token, user } = await api.signUserUp(signUpDto);
      dispatch(signIn({ token, user }));
    } catch (error) {
      if (error.response.status === 409) {
        dispatch(setError('User with such email already exists'));
      } else if (error.response.status === 400) {
        dispatch(setError('Validation error'));
      }
      validationCallback();
    }
  };
};

export const signUserIn = (signInDto, validationCallback) => {
  return async (dispatch, _, api) => {
    try {
      const { token, user } = await api.signUserIn(signInDto);
      dispatch(signIn({ token, user }));
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setError('User with such email is not found'));
      } else if (error.response.status === 403) {
        dispatch(setError('Provided password is incorrect'));
      } else if (error.response.status === 400) {
        dispatch(setError('Validation error'));
      }
      validationCallback();
    }
  };
};

export const signUserOut = token => {
  return async (dispatch, _, api) => {
    try {
      await api.signUserOut(token);
      dispatch(signOut());
    } catch (error) {
      dispatch(setError('Bearer auth failed'));
    }
  };
};

export const autoSignIn = createAsyncThunk(
  'session/autoSignIn',
  async (_, { getState, dispatch }) => {
    const { token } = getState().session;
    if (token) {
      dispatch(setIsLoading(true));
      try {
        const user = await getCurrentUser(token);
        return { token, user };
      } catch (error) {
        return { error: 'Bearer auth failed' };
      } finally {
        dispatch(setIsLoading(false));
      }
    }
  },
);
