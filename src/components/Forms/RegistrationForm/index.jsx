import { Formik, Form } from 'formik';
import { object, string, ref } from 'yup';

import Logo from 'components/Logo';
import Input from 'components/Input';
import RegularButton from 'components/Buttons/RegularButton';
import LinkButton from 'components/Buttons/LinkButton';
import postIcon from 'assets/images/post-icon.svg';
import passwordIcon from 'assets/images/password-icon.svg';
import userIcon from 'assets/images/user-icon.svg';
import styles from './styles.module.scss';

const RegistrationForm = () => {
  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  };

  const onSubmit = values => console.log(values);

  const validationSchema = object({
    email: string().required('This field is required').email('Invalid email format'),
    password: string()
      .required('This field is required')
      .min(6, 'Password must be 6 chars minimum')
      .max(12, 'Password must be 12 chars maximum'),
    confirmPassword: string()
      .required('This field is required')
      .oneOf([ref('password'), ''], 'Passwords must match'),
    name: string().required('This field is required').max(12, 'Name must be 12 chars maximum'),
  });

  return (
    <div className={styles.form}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form>
          <Input type="email" name="email" placeholder="E-mail" icon={postIcon} />
          <Input type="password" name="password" placeholder="Password" icon={passwordIcon} />
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            icon={passwordIcon}
          />
          <Input type="text" name="name" placeholder="Your name" icon={userIcon} />
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
