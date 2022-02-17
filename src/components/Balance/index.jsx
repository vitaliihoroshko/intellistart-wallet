import React from 'react';
import styles from './styles.module.scss';
import { useSelector } from 'react-redux';
import { getCurrentUser } from 'api/api-helper';
const Balance = () => {
  let userData;
  async () => {
    userData = await getCurrentUser();
  };
  console.log(userData);
  return (
    <div className={styles['balance']}>
      <p className={styles['balance__text']}>Your balance</p>
      <div className={styles['balance__num']}>₴ 24 000.00</div>
    </div>
  );
};

export default Balance;
