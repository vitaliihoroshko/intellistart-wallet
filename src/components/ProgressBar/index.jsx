import { number, string } from 'prop-types';

import Tooltip from 'components/Tooltip';
import styles from './styles.module.scss';

const ProgressBar = ({ progress, tooltip }) => {
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

ProgressBar.propTypes = {
  progress: number.isRequired,
  tooltip: string.isRequired,
};

export default ProgressBar;
