import { useSelector } from 'react-redux';

import Logo from 'components/Logo';
import ExitButton from 'components/Buttons/ExitButton';
import divider from 'assets/images/divider.svg';
import styles from './styles.module.scss';

const Header = () => {
  const user = useSelector(state => state.session.user);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <p className={styles['user-name']}>{user ? user.username : 'Name'}</p>
      <img src={divider} alt="divider" width={2} height={30} className={styles.divider} />
      <ExitButton />
    </header>
  );
};

export default Header;
