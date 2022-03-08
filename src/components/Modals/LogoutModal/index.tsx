import { VoidFunctionComponent, MouseEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { State } from 'store/types';
import { setIsModalLogoutOpen } from 'store/slices/global';
import { signUserOut } from 'store/slices/session/actions';
import RegularButton from 'components/Buttons/RegularButton';
import CloseButton from 'components/Buttons/CloseButton';
import styles from './styles.module.scss';

const LogoutModal: VoidFunctionComponent = () => {
  const isOpened = useSelector<State, boolean>(state => state.global.isModalLogoutOpen);
  const token = useSelector<State, string>(state => state.session.token!);
  const dispatch = useDispatch();

  const preventClick = (event: MouseEvent<HTMLDivElement>): void => event.stopPropagation();

  const closeHandler = (): void => {
    dispatch(setIsModalLogoutOpen(false));
  };

  const logoutHandler = (): void => {
    dispatch(signUserOut(token));
    closeHandler();
  };

  const classNames: string[] = [styles.container, isOpened ? styles['container-opened'] : ''];

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
