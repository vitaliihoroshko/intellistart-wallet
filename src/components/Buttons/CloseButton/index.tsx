import { VoidFunctionComponent } from 'react';

import closeIcon from 'assets/images/close.svg';
import styles from './styles.module.scss';

interface CloseButtonProps {
  clickHandler: () => void;
}

const CloseButton: VoidFunctionComponent<CloseButtonProps> = ({ clickHandler }) => {
  return (
    <button className={styles.button} onClick={clickHandler}>
      <img src={closeIcon} alt="Close icon" width={16} height={16} />
    </button>
  );
};

export default CloseButton;
