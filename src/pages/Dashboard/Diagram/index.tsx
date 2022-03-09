import { VoidFunctionComponent, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { State, SessionState, FinanceState } from 'store/types';
import { getTransactionsSummary } from 'store/slices/finance/actions';
import { SelectOption } from 'common/interfaces';
import DashboardPageLayout from 'components/Layouts/DashboardPageLayout';
import MainDashboard from 'components/Dashboard/MainDashboard';
import Chart from 'components/Chart';
import styles from './styles.module.scss';

const DiagramPage: VoidFunctionComponent = () => {
  const [year, setYear] = useState<SelectOption | string>('');
  const [month, setMonth] = useState<SelectOption | string>('');
  const { token } = useSelector<State, SessionState>(state => state.session);
  const { transactionsSummary } = useSelector<State, FinanceState>(state => state.finance);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(
        getTransactionsSummary(token, {
          year: year instanceof Object ? year.value : '',
          month: month instanceof Object ? month.value : '',
        }),
      );
    }
  }, [year, month]);

  const changeMonth = (month: SelectOption): void => setMonth(month);

  const changeYear = (year: SelectOption): void => setYear(year);

  return (
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
  );
};

export default DiagramPage;
