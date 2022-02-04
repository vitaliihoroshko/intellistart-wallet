import plusIcon from 'assets/images/plus.svg';
import styles from './styles.module.scss';

const ButtonAddTransactions = () => {
  return (
    <button className={styles.button}>
      <img src={plusIcon} alt="Add transactions" />
    </button>
  );
};

export default ButtonAddTransactions;
