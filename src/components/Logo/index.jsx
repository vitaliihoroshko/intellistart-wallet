import walletImage from 'assets/images/wallet-logo.svg';
import styles from './styles.module.scss';

const Logo = () => {
  return (
    <div className={styles.logo}>
      <img src={walletImage} alt="wallet-logo" width={40} height={40} className={styles.image} />
      <h1 className={styles.name}>Wallet</h1>
    </div>
  );
};

export default Logo;
