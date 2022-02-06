import { Link } from 'react-router-dom';
import { string, node } from 'prop-types';

import styles from './styles.module.scss';

const LinkButton = ({ to, children }) => {
  return (
    <Link to={to} className={styles.link}>
      {children}
    </Link>
  );
};

LinkButton.propTypes = {
  to: string.isRequired,
  children: node.isRequired,
};

export default LinkButton;
