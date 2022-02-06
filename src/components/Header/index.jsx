import Logo from 'components/Logo';
import ExitButton from 'components/Buttons/ExitButton';
import divider from 'assets/images/divider.svg';
import styles from './styles.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <p className={styles['user-name']}>Name</p>
      <img src={divider} alt="divider" width={2} height={30} className={styles.divider} />
      <ExitButton />
    </header>
  );
};

export default Header;
