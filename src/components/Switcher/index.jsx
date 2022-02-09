import styles from './styles.module.scss';

const Switcher = () => {
  return (
    <div className={styles['check_box']}>
      <p className={`${styles.check_box__option} ${styles.income}`}>Income</p>
      <label className={styles['switch']}>
        <input className={styles['switch']} type="checkbox" name="type" />
        <div className={styles['back']}>
          <div className={styles['indicator']}></div>
        </div>
      </label>
      <p className={`${styles.check_box__option} ${styles.expenses}`}>Expenses</p>
    </div>
  );
};

export default Switcher;
