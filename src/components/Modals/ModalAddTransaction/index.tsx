import { FunctionComponent, MouseEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { State } from 'store/types';
import { setIsModalAddTransactionOpen } from 'store/slices/global';
import CloseButton from 'components/Buttons/CloseButton';
import TransactionForm from 'components/Forms/TransactionForm';
import styles from './styles.module.scss';

const ModalAddTransaction: FunctionComponent = () => {
  const isOpened = useSelector<State, boolean>(state => state.global.isModalAddTransactionOpen);
  const dispatch = useDispatch();

  const preventClick = (event: MouseEvent<HTMLDivElement>): void => event.stopPropagation();

  const closeHandler = (): void => {
    dispatch(setIsModalAddTransactionOpen(false));
  };

  const classNames: string[] = [styles.modal, isOpened ? styles.modal_active : ''];

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
