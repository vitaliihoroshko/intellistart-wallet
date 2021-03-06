import RegistrationForm from 'components/Forms/RegistrationForm';
import styles from './styles.module.scss';

const RegisterPage = () => {
  return (
    <div className={styles.page_wrapper}>
      <p className={styles.app_name}>Finance App</p>
      <RegistrationForm />
    </div>
  );
};

export default RegisterPage;
