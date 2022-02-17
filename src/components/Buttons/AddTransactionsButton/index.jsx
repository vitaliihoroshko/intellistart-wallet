import { useDispatch } from 'react-redux';

import { setIsModalAddTransactionOpen } from 'store/slices/global';
import styles from './styles.module.scss';
import { ReactComponent as Plus } from 'assets/images/plus.svg';

const AddTransactionsButton = () => {
  const dispatch = useDispatch();

  const clickHandler = () => dispatch(setIsModalAddTransactionOpen(true));

  return (
    <button onClick={clickHandler} className={styles.button}>
      <Plus />
    </button>
  );
};

export default AddTransactionsButton;
