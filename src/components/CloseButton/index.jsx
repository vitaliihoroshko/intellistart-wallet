import { func } from 'prop-types';

import closeIcon from 'assets/images/close.svg';
import styles from './styles.module.scss';

const CloseButton = ({ clickHandler }) => {
  return (
    <button className={styles.button} onClick={clickHandler}>
      <img src={closeIcon} alt="Close icon" width={16} height={16} />
    </button>
  );
};

CloseButton.propTypes = {
  clickHandler: func,
};

export default CloseButton;
