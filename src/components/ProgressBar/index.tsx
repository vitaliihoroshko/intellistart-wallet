import { VoidFunctionComponent } from 'react';

import Tooltip from 'components/Tooltip';
import styles from './styles.module.scss';

interface ProgressBarProps {
  progress: number;
  tooltip: string;
}

const ProgressBar: VoidFunctionComponent<ProgressBarProps> = ({ progress, tooltip }) => {
  return (
    <Tooltip title={tooltip}>
      <div className={styles.bar}>
        <div style={{ width: `${progress}%` }} className={styles.progress}>
          &nbsp;
        </div>
      </div>
    </Tooltip>
  );
};

export default ProgressBar;
