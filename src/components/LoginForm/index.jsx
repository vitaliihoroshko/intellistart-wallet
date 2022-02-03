import { Formik } from 'formik';
import * as yup from 'yup';
import styles from './styles.module.scss';
import postIcon from 'assets/images/post-icon.svg';
import passwordIcon from 'assets/images/password-icon.svg';
import errorIcon from 'assets/images/error-icon.svg';
import RegularButton from 'components/Buttons/RegularButton';

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
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validateOnBlur
        onSubmit={values => {
          console.log({ values });
        }}
        validationSchema={validationsSchema}
      >
        {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (
          <form className={styles.form}>
            <label className={styles.form__label}>
              <img src={postIcon} alt="E-mail icon" />
              <input
                className={styles.form__input}
                type={`email`}
                name={`email`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder={`E-mail`}
              />
              {touched.email && errors.email && (
                <div>
                  <img className={styles.error} src={errorIcon} alt="Error" />
                </div>
              )}
            </label>
            {touched.email && errors.email && (
              <p className={styles.error__description}>{errors.email}</p>
            )}

            <label className={styles.form__label}>
              <img src={passwordIcon} alt="Password icon" />
              <input
                className={styles.form__input}
                type={`password`}
                name={`password`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeholder={`Password`}
              />
              {touched.password && errors.password && (
                <div>
                  <img className={styles.error} src={errorIcon} alt="Error" />
                </div>
              )}
            </label>
            {touched.password && errors.password && (
              <p className={styles.error__description}>{errors.password}</p>
            )}

            <div className={styles.form__btns}>
              <RegularButton
                isTransparent={true}
                disabled={!isValid || !dirty}
                onClick={handleSubmit}
                type={`submit`}
              >
                Log in
              </RegularButton>
              <RegularButton isTransparent={false}>Registration</RegularButton>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
