import { string, bool, node } from 'prop-types';

import styles from './styles.module.scss';

const RegularButton = ({ type, isTransparent, children }) => {
  const classNames = [styles.button, isTransparent ? styles['transparent-button'] : ''];
  return (
    <button type={type ? type : 'button'} className={classNames.join(' ')}>
      {children}
    </button>
  );
};

RegularButton.propTypes = {
  type: string,
  isTransparent: bool,
  children: node.isRequired,
};

export default RegularButton;
