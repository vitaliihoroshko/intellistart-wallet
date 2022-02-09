import styles from './styles.module.scss';
import { func } from 'prop-types';

import { ReactComponent as Plus } from 'assets/images/plus.svg';

const AddTransactionsButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.button}>
      <Plus />
    </button>
  );
};

AddTransactionsButton.propTypes = {
  onClick: func,
};

export default AddTransactionsButton;
