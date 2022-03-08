import { VoidFunctionComponent } from 'react';
import { useSelector } from 'react-redux';

import { State } from 'store/types';
import { User } from 'common/interfaces';
import Logo from 'components/Logo';
import ExitButton from 'components/Buttons/ExitButton';
import LogoutModal from 'components/Modals/LogoutModal';
import divider from 'assets/images/divider.svg';
import styles from './styles.module.scss';

const Header: VoidFunctionComponent = () => {
  const user = useSelector<State, User>(state => state.session.user!);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Logo link={true} />
      </div>
      <p className={styles['user-name']}>{user.username}</p>
      <img src={divider} alt="divider" width={2} height={30} className={styles.divider} />
      <ExitButton />
      <LogoutModal />
    </header>
  );
};

export default Header;
