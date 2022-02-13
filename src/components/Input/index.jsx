import { useState } from 'react';
import { Field, ErrorMessage } from 'formik';
import { string, func } from 'prop-types';

import TextError from 'components/TextError';
import ProgressBar from 'components/ProgressBar';
import styles from './styles.module.scss';

const Input = ({ type, name, placeholder, icon, evaluationFunction }) => {
  const [progress, setProgress] = useState({ progress: 0, tooltip: '' });
  const [progressBarIsVisible, setProgressBarIsVisible] = useState(false);

  const inputHandler = event => {
    const value = event.target.value;
    evaluationFunction(value, setProgress, setProgressBarIsVisible);
  };

  return (
    <div>
      <div className={styles.input}>
        <img src={icon} alt="icon" className={styles.icon} />
        {evaluationFunction ? (
          <Field type={type} name={name} placeholder={placeholder} onInput={inputHandler} />
        ) : (
          <Field type={type} name={name} placeholder={placeholder} />
        )}
      </div>
      <ErrorMessage name={name} component={TextError} />
      {progressBarIsVisible && (
        <ProgressBar progress={progress.progress} tooltip={progress.tooltip} />
      )}
    </div>
  );
};

Input.propTypes = {
  type: string.isRequired,
  name: string.isRequired,
  placeholder: string.isRequired,
  icon: string.isRequired,
  evaluationFunction: func,
};

export default Input;
