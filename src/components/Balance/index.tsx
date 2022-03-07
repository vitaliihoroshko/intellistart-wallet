import { VoidFunctionComponent } from 'react';
import { useSelector } from 'react-redux';

import { State } from 'store/types';
import styles from './styles.module.scss';

const Balance: VoidFunctionComponent = () => {
  const { totalBalance } = useSelector((state: State) => state.finance);

  return (
    <div className={styles['balance']}>
      <p className={styles['balance__text']}>Your balance</p>
      <div className={styles['balance__num']}>₴ {((totalBalance * 100) / 100).toFixed(2)}</div>
    </div>
  );
};

export default Balance;
