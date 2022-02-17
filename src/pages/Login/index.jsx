import LoginForm from 'components/Forms/LoginForm';
import styles from './styles.module.scss';

const LoginPage = () => {
  return (
    <div className={styles.page_wrapper}>
      <p className={styles.app_name}>Finance App</p>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
