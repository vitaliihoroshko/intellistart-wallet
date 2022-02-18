import { TailSpin } from 'react-loader-spinner';

import styles from './styles.module.scss';

const LoadingSpinner = () => {
  return (
    <div className={styles.spinner}>
      <TailSpin color="#24cca7" height={100} width={100} timeout={3000} />
    </div>
  );
};

export default LoadingSpinner;
