import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import DashboardPageLayout from 'components/DashboardPageLayout';
import Dashboard from 'components/Dashboard';
import Card from 'components/Card';
import AddTransactionsButton from 'components/Buttons/AddTransactionsButton';
import ModalAddTransaction from 'components/Modals/ModalAddTransaction';
import styles from './styles.module.scss';

const DashboardPage = () => {
  return (
    <>
      <ModalAddTransaction />
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
    </>
  );
};

export default DashboardPage;
