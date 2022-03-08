import { FunctionComponent } from 'react';

import errorIcon from 'assets/images/error-icon.svg';
import styles from './styles.module.scss';

const TextError: FunctionComponent = ({ children }) => {
  return (
    <div className={styles.error}>
      <img src={errorIcon} alt="error" width={23} height={23} className={styles['error-icon']} />
      <p className={styles['error-text']}>{children}</p>
    </div>
  );
};

export default TextError;
