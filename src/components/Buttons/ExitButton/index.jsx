import { useState } from 'react';

import LogoutModal from 'components/LogoutModal';
import exitIcon from 'assets/images/exit-icon.svg';
import styles from './styles.module.scss';

const ExitButton = () => {
  const [modalIsOpened, setModalIsOpened] = useState(false);

  const openModal = () => setModalIsOpened(true);
  const closeModal = () => setModalIsOpened(false);

  return (
    <>
      <button className={styles.button} onClick={openModal}>
        <img
          src={exitIcon}
          alt="exit-icon"
          width={18}
          height={18}
          className={styles['exit-icon']}
        />
        <span className={styles.exit}>Exit</span>
        &nbsp;
      </button>
      <LogoutModal isOpened={modalIsOpened} closeHandler={closeModal} />
    </>
  );
};

export default ExitButton;
