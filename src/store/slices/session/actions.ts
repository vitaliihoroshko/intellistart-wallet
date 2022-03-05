import { createAsyncThunk, Dispatch as DispatchFunction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { FormikErrors } from 'formik';

import { getCurrentUser } from 'api/api-helper';
import { signIn, signOut, setError } from '.';
import { SessionState, Thunk, Dispatch, GetState, Api } from 'store/types';
import { setIsLoading, setPathname } from 'store/slices/global';
import { setTotalBalance } from 'store/slices/finance';
import { SignUpDto, SignInDto } from 'common/interfaces';

export const signUserUp = (
  signUpDto: SignUpDto,
  validationCallback: (values?: SignUpDto) => Promise<FormikErrors<SignUpDto>>,
): Thunk => {
  return async (dispatch: Dispatch, _: GetState, api: Api): Promise<void> => {
    try {
      const { token, user } = await api.signUserUp(signUpDto);
      dispatch(signIn({ token, user }));
      dispatch(setTotalBalance(user.balance));
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 409) {
        dispatch(setError('User with such email already exists'));
      } else if (axiosError.response?.status === 400) {
        dispatch(setError('Validation error'));
      }
      validationCallback();
    }
  };
};

export const signUserIn = (
  signInDto: SignInDto,
  validationCallback: (values?: SignInDto) => Promise<FormikErrors<SignInDto>>,
): Thunk => {
  return async (dispatch: Dispatch, _: GetState, api: Api): Promise<void> => {
    try {
      const { token, user } = await api.signUserIn(signInDto);
      dispatch(signIn({ token, user }));
      dispatch(setTotalBalance(user.balance));
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 404) {
        dispatch(setError('User with such email is not found'));
      } else if (axiosError.response?.status === 403) {
        dispatch(setError('Provided password is incorrect'));
      } else if (axiosError.response?.status === 400) {
        dispatch(setError('Validation error'));
      }
      validationCallback();
    }
  };
};

export const signUserOut = (token: string): Thunk => {
  return async (dispatch: Dispatch, _: GetState, api: Api): Promise<void> => {
    try {
      await api.signUserOut(token);
      dispatch(signOut());
      dispatch(setPathname('/'));
    } catch (error) {
      dispatch(setError('Bearer auth failed'));
    }
  };
};

export const autoSignIn = createAsyncThunk(
  'session/autoSignIn',
  async (
    _: undefined,
    { getState, dispatch }: { getState: () => unknown; dispatch: DispatchFunction },
  ): Promise<Pick<SessionState, 'token' | 'user'> | Pick<SessionState, 'error'> | undefined> => {
    const getAppState = getState as GetState;
    const { token } = getAppState().session;
    if (token) {
      dispatch(setIsLoading(true));
      try {
        const user = await getCurrentUser(token);
        dispatch(setTotalBalance(user.balance));
        return { token, user };
      } catch (error: unknown) {
        return { error: 'Bearer auth failed' };
      } finally {
        dispatch(setIsLoading(false));
      }
    }
  },
);
