import { useSelector, useDispatch } from 'react-redux';

import { setIsModalAddTransactionOpen } from 'store/slices/global';
import CloseButton from 'components/Buttons/CloseButton';
import styles from './styles.module.scss';
import TransactionForm from 'components/Forms/TransactionForm';

const ModalAddTransaction = () => {
  const isOpened = useSelector(state => state.global.isModalAddTransactionOpen);
  const dispatch = useDispatch();

  const preventClick = event => event.stopPropagation();

  const closeHandler = () => dispatch(setIsModalAddTransactionOpen(false));

  const classNames = [styles.modal, isOpened ? styles.modal_active : ''];

  return (
    <div className={classNames.join(' ')} onClick={closeHandler}>
      <div className={styles['modal_content']} onClick={preventClick}>
        <div className={styles['close_button']}>
          <CloseButton clickHandler={closeHandler} />
        </div>
        <h2 className={styles['modal_title']}>Add transaction</h2>
        <TransactionForm modalIsOpened={isOpened} />
      </div>
    </div>
  );
};

export default ModalAddTransaction;
