import Currency from 'components/Currency';
import Dashboard from 'components/Dashboard';
import styles from 'components/Dashboard/styles.module.scss';

const DashboardPage = () => {
  return (
    <div className={styles['bg']}>
      <Currency />
      <Dashboard />
    </div>
  );
};

export default DashboardPage;
