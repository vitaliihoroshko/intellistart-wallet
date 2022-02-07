import { useSelector, useDispatch } from 'react-redux';

import { signUserOut } from 'api/api-helper';
import { authSliceActions } from 'store/slices/authSlice';
import exitIcon from 'assets/images/exit-icon.svg';
import styles from './styles.module.scss';

const ExitButton = () => {
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();

  const clickHandler = async () => {
    try {
      await signUserOut(token);
      dispatch(authSliceActions.signUserOut());
    } catch (error) {
      dispatch(authSliceActions.setError('Bearer auth failed'));
    }
  };

  return (
    <button className={styles.button} onClick={clickHandler}>
      <img src={exitIcon} alt="exit-icon" width={18} height={18} className={styles['exit-icon']} />
      <span className={styles.exit}>Exit</span>
      &nbsp;
    </button>
  );
};

export default ExitButton;
