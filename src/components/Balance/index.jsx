import React from 'react';
import styles from './styles.module.scss';
import { useSelector } from 'react-redux';

const Balance = () => {
  const user = useSelector(state => state.session.user);

  return (
    <div className={styles['balance']}>
      <p className={styles['balance__text']}>Your balance</p>
      <div className={styles['balance__num']}>₴ {user.balance}</div>
    </div>
  );
};

export default Balance;
