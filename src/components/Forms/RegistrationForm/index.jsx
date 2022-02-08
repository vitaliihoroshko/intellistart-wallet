import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import { object, string, ref } from 'yup';

import { signUserUp } from 'api/api-helper';
import { sessionSliceActions } from 'store/slices/sessionSlice';
import Logo from 'components/Logo';
import Input from 'components/Input';
import RegularButton from 'components/Buttons/RegularButton';
import LinkButton from 'components/Buttons/LinkButton';
import postIcon from 'assets/images/post-icon.svg';
import passwordIcon from 'assets/images/password-icon.svg';
import userIcon from 'assets/images/user-icon.svg';
import styles from './styles.module.scss';

const RegistrationForm = () => {
  const [submittedEmail, setSubmittedEmail] = useState('');
  const sessionError = useSelector(state => state.session.error);
  const dispatch = useDispatch();

  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
  };

  const submitHandler = async (values, actions) => {
    const { email, password, username } = values;
    setSubmittedEmail(email);
    try {
      const { token, user } = await signUserUp({ email, password, username });
      dispatch(sessionSliceActions.signUserIn({ token, user }));
    } catch (error) {
      if (error.response.status === 400) {
        dispatch(sessionSliceActions.setError('Validation error'));
      } else if (error.response.status === 409) {
        dispatch(sessionSliceActions.setError('User with such email already exists'));
      }
      actions.validateForm();
    }
  };

  const validationSchema = object({
    email: string()
      .required('This field is required')
      .email('Invalid email format')
      .test('Unique Email', sessionError, value => {
        return sessionError && sessionError.includes('email') && submittedEmail !== value;
      }),
    password: string()
      .required('This field is required')
      .min(6, 'Password must be 6 chars minimum')
      .max(12, 'Password must be 12 chars maximum'),
    confirmPassword: string()
      .required('This field is required')
      .oneOf([ref('password'), ''], 'Passwords must match'),
    username: string().required('This field is required').max(12, 'Name must be 12 chars maximum'),
  });

  return (
    <div className={styles.form}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        <Form>
          <Input type="email" name="email" placeholder="E-mail" icon={postIcon} />
          <Input type="password" name="password" placeholder="Password" icon={passwordIcon} />
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            icon={passwordIcon}
          />
          <Input type="text" name="username" placeholder="Your name" icon={userIcon} />
          <div className={styles.buttons}>
            <RegularButton type="submit">Registration</RegularButton>
            <LinkButton to="/login">Login</LinkButton>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default RegistrationForm;
