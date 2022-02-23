import { useDispatch } from 'react-redux';

import { setIsModalAddTransactionOpen } from 'store/slices/global';
import plus from 'assets/images/plus.svg';
import styles from './styles.module.scss';

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
