import { string, bool, func, node } from 'prop-types';

import styles from './styles.module.scss';

const RegularButton = ({ type, isTransparent, clickHandler, children }) => {
  const classNames = [styles.button, isTransparent ? styles['transparent-button'] : ''];
  return (
    <button type={type ? type : 'button'} className={classNames.join(' ')} onClick={clickHandler}>
      {children}
    </button>
  );
};

RegularButton.propTypes = {
  type: string,
  isTransparent: bool,
  clickHandler: func,
  children: node.isRequired,
};

export default RegularButton;
