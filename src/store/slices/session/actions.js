import { signIn, signOut, setError } from '.';

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