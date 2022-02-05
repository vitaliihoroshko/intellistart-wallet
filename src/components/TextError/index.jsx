import { node } from 'prop-types';

import errorIcon from 'assets/images/error-icon.svg';
import styles from './styles.module.scss';

const TextError = ({ children }) => {
  return (
    <div className={styles.error}>
      <img src={errorIcon} alt="error" width={23} height={23} className={styles['error-icon']} />
      <p className={styles['error-text']}>{children}</p>
    </div>
  );
};

TextError.propTypes = {
  children: node,
};

export default TextError;
