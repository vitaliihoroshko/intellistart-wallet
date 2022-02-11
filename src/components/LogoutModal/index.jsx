import { useSelector, useDispatch } from 'react-redux';
import { bool, func } from 'prop-types';

import { signUserOut } from 'store/slices/session/actions';
import RegularButton from 'components/Buttons/RegularButton';
import CloseButton from 'components/CloseButton';
import styles from './styles.module.scss';

const LogoutModal = ({ isOpened, closeHandler }) => {
  const token = useSelector(state => state.session.token);
  const dispatch = useDispatch();

  const preventClick = event => event.stopPropagation();
  const logoutHandler = () => {
    dispatch(signUserOut(token));
    closeHandler();
  };

  const classNames = [styles.container, isOpened ? styles['container-opened'] : ''];

  return (
    <div className={classNames.join(' ')} onClick={closeHandler}>
      <div className={styles.modal} onClick={preventClick}>
        <div className={styles['close-button']}>
          <CloseButton clickHandler={closeHandler} />
        </div>
        <h2>Are you sure you want to log out?</h2>
        <div className={styles.buttons}>
          <RegularButton clickHandler={closeHandler}>No</RegularButton>
          <RegularButton isTransparent={true} clickHandler={logoutHandler}>
            Yes
          </RegularButton>
        </div>
      </div>
    </div>
  );
};

LogoutModal.propTypes = {
  isOpened: bool.isRequired,
  closeHandler: func.isRequired,
};

export default LogoutModal;
