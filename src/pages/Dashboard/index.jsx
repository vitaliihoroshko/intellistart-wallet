import React from 'react';
import Chart from 'components/Chart';
import styles from './styles.module.scss';
import Dropdown from 'components/StatisticTable/Dropdown';
import StatisticTable from 'components/StatisticTable';

function Dashboard() {
  return (
    <div className={styles.container}>
      <Chart />
      <div className={styles.statistic__side}>
        <Dropdown />
        <StatisticTable />
      </div>
    </div>
  );
}

export default Dashboard;
