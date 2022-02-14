import { useSelector, useDispatch } from 'react-redux';

import { setIsModalLogoutOpen } from 'store/slices/global';
import { signUserOut } from 'store/slices/session/actions';
import RegularButton from 'components/Buttons/RegularButton';
import CloseButton from 'components/Buttons/CloseButton';
import styles from './styles.module.scss';

const LogoutModal = () => {
  const isOpened = useSelector(state => state.global.isModalLogoutOpen);
  const token = useSelector(state => state.session.token);
  const dispatch = useDispatch();

  const preventClick = event => event.stopPropagation();

  const closeHandler = () => dispatch(setIsModalLogoutOpen(false));

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

export default LogoutModal;
