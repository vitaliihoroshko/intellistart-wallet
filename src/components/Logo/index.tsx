import { VoidFunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';

import walletImage from 'assets/images/wallet-logo.svg';
import styles from './styles.module.scss';

interface LogoProps {
  link?: boolean;
}

const Logo: VoidFunctionComponent<LogoProps> = ({ link }) => {
  const navigate = useNavigate();

  const classNames: string[] = [styles.logo, link ? styles.link : ''];

  return (
    <div className={classNames.join(' ')} onClick={link ? () => navigate('/home') : () => {}}>
      <img src={walletImage} alt="wallet-logo" width={40} height={40} className={styles.image} />
      <h1 className={styles.name}>Wallet</h1>
      <span>&nbsp;</span>
    </div>
  );
};

export default Logo;
