import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

interface LinkButtonProps {
  to: string;
}

const LinkButton: FunctionComponent<LinkButtonProps> = ({ to, children }) => {
  return (
    <Link to={to} className={styles.link}>
      {children}
    </Link>
  );
};

export default LinkButton;
