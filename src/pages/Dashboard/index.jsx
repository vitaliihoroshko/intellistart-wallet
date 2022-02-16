import Currency from 'components/Currency';
import Dashboard from 'components/Dashboard';
import Card from 'components/Card';
import AddTransactionsButton from 'components/Buttons/AddTransactionsButton';
import ModalAddTransaction from 'components/Modals/ModalAddTransaction';
import styles from './styles.module.scss';

const DashboardPage = () => {
  return (
    <div className={styles.background}>
      <ModalAddTransaction />
      <Card />>
      <Currency />
      <Dashboard />
      <AddTransactionsButton />
    </div>
  );
};

export default DashboardPage;
