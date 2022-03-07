import { VoidFunctionComponent } from 'react';
import { useDispatch } from 'react-redux';

import { setIsModalAddTransactionOpen } from 'store/slices/global';
import plus from 'assets/images/plus.svg';
import styles from './styles.module.scss';

const AddTransactionsButton: VoidFunctionComponent = () => {
  const dispatch = useDispatch();

  const clickHandler = (): void => {
    dispatch(setIsModalAddTransactionOpen(true));
  };

  return (
    <button onClick={clickHandler} className={styles.button}>
      <img src={plus} alt="Plus" />
    </button>
  );
};

export default AddTransactionsButton;
