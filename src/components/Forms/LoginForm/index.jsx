import { Formik, Form } from 'formik';
import * as yup from 'yup';

import Logo from 'components/Logo';
import Input from 'components/Input';
import RegularButton from 'components/Buttons/RegularButton';
import LinkButton from 'components/Buttons/LinkButton';
import postIcon from 'assets/images/post-icon.svg';
import passwordIcon from 'assets/images/password-icon.svg';
import styles from './styles.module.scss';

const initialValues = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const validationsSchema = yup.object().shape({
    email: yup.string().email('Incorrect email address').required('Required field!'),
    password: yup
      .string()
      .typeError('Incorrect password')
      .required('Required field!')
      .min(6, 'Password is too short - should be 6 chars minimum.')
      .max(12, 'Password is too long - should be 12 chars maximum.'),
  });

  return (
    <div className={styles['form-wrapper']}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={values => {
          console.log({ values });
        }}
        validationSchema={validationsSchema}
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
