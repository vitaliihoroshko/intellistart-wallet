import { bool, func } from 'prop-types';
import { useEffect } from 'react';

import styles from './styles.module.scss';
import { ReactComponent as Close } from 'assets/images/close.svg';
import RegularButton from 'components/Buttons/RegularButton';

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
        <button className={styles['btn_close']} onClick={() => setActive(false)}>
          <Close />
        </button>
        <h2 className={styles['modal_title']}>Add transaction</h2>
        <div className={styles.modal_btns}>
          <RegularButton>Add</RegularButton>
          <RegularButton isTransparent={true}>Cancel</RegularButton>
        </div>
      </div>
    </div>
  );
};

ModalAddTransaction.propTypes = {
  active: bool,
  setActive: func,
};

export default ModalAddTransaction;
