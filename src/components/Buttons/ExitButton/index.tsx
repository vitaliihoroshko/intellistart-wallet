import { VoidFunctionComponent } from 'react';
import { useDispatch } from 'react-redux';

import { setIsModalLogoutOpen } from 'store/slices/global';
import exitIcon from 'assets/images/exit-icon.svg';
import styles from './styles.module.scss';

const ExitButton: VoidFunctionComponent = () => {
  const dispatch = useDispatch();

  const clickHandler = (): void => {
    dispatch(setIsModalLogoutOpen(true));
  };

  return (
    <>
      <button className={styles.button} onClick={clickHandler}>
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
    </>
  );
};

export default ExitButton;
