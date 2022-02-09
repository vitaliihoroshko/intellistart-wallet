import { signUserUp, signUserIn, signUserOut } from 'api/api-helper';
import { signIn, signOut, setError } from '.';

export const signUpActionCreator = (signUpDto, validationCallback) => {
  return async dispatch => {
    try {
      const { token, user } = await signUserUp(signUpDto);
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

export const signInActionCreator = (signInDto, validationCallback) => {
  return async dispatch => {
    try {
      const { token, user } = await signUserIn(signInDto);
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

export const singOutActionCreator = token => {
  return async dispatch => {
    try {
      await signUserOut(token);
      dispatch(signOut());
    } catch (error) {
      dispatch(setError('Bearer auth failed'));
    }
  };
};
