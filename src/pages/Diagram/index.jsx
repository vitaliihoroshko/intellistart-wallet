import { useEffect, useState } from 'react';

import Currency from 'components/Currency';
import MainDashboard from 'components/Dashboard/MainDashboard';
import Balance from 'components/Balance';
import AddTransactionsButton from 'components/Buttons/AddTransactionsButton';
import ModalAddTransaction from 'components/Modals/ModalAddTransaction';
import Chart from 'components/Chart';
import { getChartData } from 'api/api-helper';
import { useSelector } from 'react-redux';

import styles from './styles.module.scss';
import Header from 'components/Header';

const DashboardPage = () => {
  const token = useSelector(state => state.session.token);
  const [categories, setCategories] = useState(null);
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');

  useEffect(() => {
    let params = { token };

    if (year && month) {
      params = { ...params, year: year.value, month: month.value };
    }

    getChartData(params).then(res => {
      res = {
        ...res,
        expenseSummary: Math.abs(res?.expenseSummary),
        categoriesSummary: res?.categoriesSummary?.map(i => ({ ...i, total: Math.abs(i.total) })),
      };
      setCategories(res);
    });
  }, [year, month]);

  function changeMonth(month) {
    setMonth(month);
  }

  function changeYear(year) {
    setYear(year);
  }

  return (
    <div className={styles.background}>
      <Header />
      <ModalAddTransaction />
      <div className={styles['leftSide']}>
        <Balance />
        <Currency />
      </div>
      <div className={styles['rightSide']}>
        <Chart categories={categories} />
        <MainDashboard
          categories={categories}
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
