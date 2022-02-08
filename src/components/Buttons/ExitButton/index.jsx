import { useSelector, useDispatch } from 'react-redux';

import { signUserOut } from 'api/api-helper';
import { sessionSliceActions } from 'store/slices/sessionSlice';
import exitIcon from 'assets/images/exit-icon.svg';
import styles from './styles.module.scss';

const ExitButton = () => {
  const token = useSelector(state => state.session.token);
  const dispatch = useDispatch();

  const clickHandler = async () => {
    try {
      await signUserOut(token);
      dispatch(sessionSliceActions.signUserOut());
    } catch (error) {
      dispatch(sessionSliceActions.setError('Bearer auth failed'));
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
