import { VoidFunctionComponent } from 'react';
import { TailSpin } from 'react-loader-spinner';

import styles from './styles.module.scss';

const LoadingSpinner: VoidFunctionComponent = () => {
  return (
    <div className={styles.spinner}>
      <TailSpin color="#24cca7" height={100} width={100} />
    </div>
  );
};

export default LoadingSpinner;
