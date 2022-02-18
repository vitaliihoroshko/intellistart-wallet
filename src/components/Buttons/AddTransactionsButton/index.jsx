import { useDispatch } from 'react-redux';

import { setIsModalAddTransactionOpen } from 'store/slices/global';
import styles from './styles.module.scss';
import plus from 'assets/images/plus.svg';

const AddTransactionsButton = () => {
  const dispatch = useDispatch();

  const clickHandler = () => dispatch(setIsModalAddTransactionOpen(true));

  return (
    <button onClick={clickHandler} className={styles.button}>
      <img src={plus} alt="Plus" />
    </button>
  );
};

export default AddTransactionsButton;
