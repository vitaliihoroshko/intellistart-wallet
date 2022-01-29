import exitIcon from 'assets/images/exit-icon.svg';
import styles from './styles.module.scss';

const ExitButton = () => {
  return (
    <button className={styles.button}>
      <img src={exitIcon} alt="exit-icon" width={18} height={18} className={styles['exit-icon']} />
      <span className={styles.exit}>Exit</span>
      &nbsp;
    </button>
  );
};

export default ExitButton;
