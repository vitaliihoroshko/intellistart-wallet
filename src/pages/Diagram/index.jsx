import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getTransactionsSummary } from 'store/slices/finance/actions';
import Currency from 'components/Currency';
import MainDashboard from 'components/Dashboard/MainDashboard';
import Balance from 'components/Balance';
import AddTransactionsButton from 'components/Buttons/AddTransactionsButton';
import ModalAddTransaction from 'components/Modals/ModalAddTransaction';
import Chart from 'components/Chart';
import Header from 'components/Header';
import styles from './styles.module.scss';

const DashboardPage = () => {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const { token } = useSelector(state => state.session);
  const { transactionsSummary } = useSelector(state => state.finance);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getTransactionsSummary(token, {
        year: year.value,
        month: month.value,
      }),
    );
  }, [year, month]);

  const changeMonth = month => setMonth(month);

  const changeYear = year => setYear(year);

  return (
    <div className={styles.background}>
      <Header />
      <ModalAddTransaction />
      <div className={styles['leftSide']}>
        <Balance />
        <Currency />
      </div>
      <div className={styles['rightSide']}>
        <Chart categories={transactionsSummary} />
        <MainDashboard
          categories={transactionsSummary}
          month={month}
          year={year}
          changeMonth={changeMonth}
          changeYear={changeYear}
        />
      </div>
      <AddTransactionsButton />
    </div>
  );
};

export default DashboardPage;
