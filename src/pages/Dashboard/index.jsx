import Currency from 'components/Currency';
import Dashboard from 'components/Dashboard';
import styles from './styles.module.scss';

const DashboardPage = () => {
  return (
    <div className={styles.background}>
      <Currency />
      <Dashboard />
    </div>
  );
};

export default DashboardPage;
