import React from 'react';
import styles from './styles.module.scss';

function StatisticTableTotal() {
  return (
    <div>
      <div className={styles.wrapper}>
        <p className={styles.expenses}>Expenses:</p>
        <p className={styles.expenses__num}>22 549.24</p>
      </div>
      <div className={styles.wrapper}>
        <p className={styles.incomes}>Incomes:</p>
        <p className={styles.incomes__num}>27 350.00</p>
      </div>
    </div>
  );
}

export default StatisticTableTotal;
