import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getTransactionsSummary } from 'store/slices/finance/actions';
import DashboardPageLayout from 'components/DashboardPageLayout';
import MainDashboard from 'components/Dashboard/MainDashboard';
import Chart from 'components/Chart';
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
      <DashboardPageLayout>
        <div className={styles.content}>
          <Chart categories={transactionsSummary} />
          <MainDashboard
            categories={transactionsSummary}
            month={month}
            year={year}
            changeMonth={changeMonth}
            changeYear={changeYear}
          />
        </div>
      </DashboardPageLayout>
    </div>
  );
};

export default DashboardPage;
