import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import useWindowWidth from 'hooks/useWindowWidth';
import DashboardPageLayout from 'components/DashboardPageLayout';
import Dashboard from 'components/Dashboard';
import Card from 'components/Card';
import AddTransactionsButton from 'components/Buttons/AddTransactionsButton';
import ModalAddTransaction from 'components/Modals/ModalAddTransaction';
import styles from './styles.module.scss';

const DashboardPage = () => {
  const modalStatus = useSelector(state => state.global.isModalAddTransactionOpen);
  const windowWidth = useWindowWidth();

  return (
    <>
      <ModalAddTransaction />
      <div
        className={`${styles.background} ${
          modalStatus && windowWidth <= 480 ? styles.hide_content : ''
        }`}
      >
        <DashboardPageLayout>
          <div className={styles.content}>
            <Card />
            <Dashboard />
          </div>
        </DashboardPageLayout>
        <AddTransactionsButton />
        <ToastContainer
          position="bottom-right"
          closeButton={false}
          hideProgressBar
          autoClose={3000}
        />
      </div>
    </>
  );
};

export default DashboardPage;
