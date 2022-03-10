import { VoidFunctionComponent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, FormikHelpers } from 'formik';
import { object, string, ref } from 'yup';
import { Message } from 'yup/lib/types';

import { State } from 'store/types';
import { signUserUp } from 'store/slices/session/actions';
import { SignUpDto } from 'common/interfaces';
import Logo from 'components/Logo';
import Input from 'components/Input';
import RegularButton from 'components/Buttons/RegularButton';
import LinkButton from 'components/Buttons/LinkButton';
import postIcon from 'assets/images/post-icon.svg';
import passwordIcon from 'assets/images/password-icon.svg';
import userIcon from 'assets/images/user-icon.svg';
import { evaluatePasswordProgress } from 'utils/evaluationFunctions';
import styles from './styles.module.scss';

const RegistrationForm: VoidFunctionComponent = () => {
  const [submittedEmail, setSubmittedEmail] = useState<string>('');
  const sessionError = useSelector<State, string | null>(state => state.session.error);
  const dispatch = useDispatch();

  type Values = SignUpDto & { confirmPassword: string };

  const initialValues: Values = {
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
  };

  const submitHandler = (values: Values, actions: FormikHelpers<Values>): void => {
    const { email, password, username } = values;
    setSubmittedEmail(email);
    const { validateForm } = actions;
    dispatch(signUserUp({ email, password, username }, validateForm));
  };

  const validationSchema = object({
    email: string()
      .required('This field is required')
      .email('Invalid email format')
      .test('Unique Email', sessionError as Message, (value: string | undefined): boolean => {
        return !(sessionError && sessionError.includes('email') && submittedEmail === value);
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
    <div className={styles.form_wrapper}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        <Form className={styles.form}>
          <Input type="email" name="email" placeholder="E-mail" icon={postIcon} />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            icon={passwordIcon}
            evaluationFunction={evaluatePasswordProgress}
          />
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
