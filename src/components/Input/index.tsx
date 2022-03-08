import { VoidFunctionComponent, useState } from 'react';
import { Field, ErrorMessage } from 'formik';

import { EvaluationFunction } from 'common/types';
import { ProgressData } from 'common/interfaces';
import TextError from 'components/TextError';
import ProgressBar from 'components/ProgressBar';
import styles from './styles.module.scss';

interface InputProps {
  type: string;
  name: string;
  placeholder: string;
  icon: string;
  evaluationFunction?: EvaluationFunction;
}

const Input: VoidFunctionComponent<InputProps> = props => {
  const { type, name, placeholder, icon, evaluationFunction } = props;
  const [progressData, setProgressData] = useState<ProgressData>({ progress: 0, tooltip: '' });
  const [progressBarIsVisible, setProgressBarIsVisible] = useState<boolean>(false);

  const inputHandler = (event: InputEvent): void => {
    const element = event.target as HTMLInputElement;
    const value = element.value;
    if (evaluationFunction) evaluationFunction(value, setProgressData, setProgressBarIsVisible);
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
        <ProgressBar progress={progressData.progress} tooltip={progressData.tooltip} />
      )}
    </div>
  );
};

export default Input;
