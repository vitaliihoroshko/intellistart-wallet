import styles from './styles.module.scss';
import PropTypes from 'prop-types';

const RegularButton = ({ isTransparent, children }) => {
  const classNames = [styles.some__button, isTransparent ? styles[`transparent__btn`] : ''];
  return <button className={classNames.join(' ')}>{children}</button>;
};

RegularButton.propTypes = {
  isTransparent: PropTypes.node,
  children: PropTypes.node,
};
export default RegularButton;
