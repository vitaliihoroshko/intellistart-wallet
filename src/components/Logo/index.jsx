import { useNavigate } from 'react-router-dom';
import { bool } from 'prop-types';

import walletImage from 'assets/images/wallet-logo.svg';
import styles from './styles.module.scss';

const Logo = ({ link }) => {
  const navigate = useNavigate();

  const classNames = [styles.logo, link ? styles.link : ''];

  return (
    <div className={classNames.join(' ')} onClick={link ? () => navigate('/home') : () => {}}>
      <img src={walletImage} alt="wallet-logo" width={40} height={40} className={styles.image} />
      <h1 className={styles.name}>Wallet</h1>
      <span>&nbsp;</span>
    </div>
  );
};

Logo.propTypes = {
  link: bool,
};

export default Logo;
