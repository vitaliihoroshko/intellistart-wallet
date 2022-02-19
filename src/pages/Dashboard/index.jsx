import { useSelector } from 'react-redux';
import Currency from 'components/Currency';
import Dashboard from 'components/Dashboard';
import Card from 'components/Card';
import Balance from 'components/Balance';
import AddTransactionsButton from 'components/Buttons/AddTransactionsButton';
import ModalAddTransaction from 'components/Modals/ModalAddTransaction';
import styles from './styles.module.scss';

const DashboardPage = () => {
  const modalStatus = useSelector(state => state.global.isModalAddTransactionOpen);
  const windowWidth = document.documentElement.clientWidth;

  return (
    <>
      <ModalAddTransaction />
      <div
        className={`${styles.background} ${
          modalStatus && windowWidth <= 480 ? styles.hide_content : ''
        }`}
      >
        <div className={styles['leftSide']}>
          <Balance />
          <Currency />
        </div>
        <div className={styles['rightSide']}>
          <Card />
          <Dashboard />
        </div>
        <AddTransactionsButton />
      </div>
    </>
  );
};

export default DashboardPage;
