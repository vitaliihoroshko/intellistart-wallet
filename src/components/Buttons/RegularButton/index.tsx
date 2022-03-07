import { FunctionComponent } from 'react';

import styles from './styles.module.scss';

interface RegularButtonProps {
  type?: 'button' | 'submit' | 'reset';
  isTransparent?: boolean;
  clickHandler?: () => void;
}

const RegularButton: FunctionComponent<RegularButtonProps> = props => {
  const { type, isTransparent, clickHandler, children } = props;
  const classNames = [styles.button, isTransparent ? styles['transparent-button'] : ''];
  return (
    <button type={type ? type : 'button'} className={classNames.join(' ')} onClick={clickHandler}>
      {children}
    </button>
  );
};

export default RegularButton;
