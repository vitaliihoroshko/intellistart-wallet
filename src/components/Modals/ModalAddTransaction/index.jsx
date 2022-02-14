import { bool, func } from 'prop-types';
import { useEffect } from 'react';

import CloseButton from 'components/Buttons/CloseButton';
import styles from './styles.module.scss';
import TransactionForm from 'components/Forms/TransactionForm';

const ModalAddTransaction = ({ active, setActive }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        setActive(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
  });

  return (
    <div
      className={active ? styles['modal_active'] : styles['modal']}
      onClick={() => setActive(false)}
    >
      <div className={styles['modal_content']} onClick={event => event.stopPropagation()}>
        <div className={styles['close_button']}>
          <CloseButton clickHandler={() => setActive(false)} />
        </div>
        <h2 className={styles['modal_title']}>Add transaction</h2>
        <TransactionForm />
      </div>
    </div>
  );
};

ModalAddTransaction.propTypes = {
  active: bool,
  setActive: func,
};

export default ModalAddTransaction;
