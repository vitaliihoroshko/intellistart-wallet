import { useSelector, useDispatch } from 'react-redux';

import { signUserOut } from 'store/slices/session/actions';
import exitIcon from 'assets/images/exit-icon.svg';
import styles from './styles.module.scss';

const ExitButton = () => {
  const token = useSelector(state => state.session.token);
  const dispatch = useDispatch();

  const clickHandler = async () => dispatch(signUserOut(token));

  return (
    <button className={styles.button} onClick={clickHandler}>
      <img src={exitIcon} alt="exit-icon" width={18} height={18} className={styles['exit-icon']} />
      <span className={styles.exit}>Exit</span>
      &nbsp;
    </button>
  );
};

export default ExitButton;
