import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import { object, string } from 'yup';

import { signUserIn } from 'store/slices/session/actions';
import Logo from 'components/Logo';
import Input from 'components/Input';
import RegularButton from 'components/Buttons/RegularButton';
import LinkButton from 'components/Buttons/LinkButton';
import postIcon from 'assets/images/post-icon.svg';
import passwordIcon from 'assets/images/password-icon.svg';
import styles from './styles.module.scss';

const LoginForm = () => {
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [submittedPassword, setSubmittedPassword] = useState('');
  const sessionError = useSelector(state => state.session.error);
  const dispatch = useDispatch();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationsSchema = object({
    email: string()
      .required('This field is required')
      .email('Invalid email format')
      .test('Existing User', sessionError, value => {
        return !(sessionError && sessionError.includes('email') && submittedEmail === value);
      }),
    password: string()
      .required('This field is required')
      .min(6, 'Password must be 6 chars minimum')
      .max(12, 'Password must be 12 chars maximum')
      .test('Correct Password', sessionError, value => {
        return !(sessionError && sessionError.includes('password') && submittedPassword === value);
      }),
  });

  const submitHandler = (values, actions) => {
    const { email, password } = values;
    setSubmittedEmail(email);
    setSubmittedPassword(password);
    const { validateForm } = actions;
    dispatch(signUserIn({ email, password }, validateForm));
  };

  return (
    <div className={styles['form-wrapper']}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationsSchema}
        onSubmit={submitHandler}
      >
        <Form className={styles.form}>
          <Input type="email" name="email" placeholder="E-mail" icon={postIcon} />
          <Input type="password" name="password" placeholder="Password" icon={passwordIcon} />
          <div className={styles.form__btns}>
            <RegularButton type="submit">Log in</RegularButton>
            <LinkButton to="/register">Registration</LinkButton>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
