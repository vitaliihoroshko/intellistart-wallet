import { Field, ErrorMessage } from 'formik';
import { string } from 'prop-types';

import TextError from 'components/TextError';
import styles from './styles.module.scss';

const Input = ({ type, name, placeholder, icon }) => {
  return (
    <div>
      <div className={styles.input}>
        <img src={icon} alt="icon" className={styles.icon} />
        <Field type={type} name={name} placeholder={placeholder} />
      </div>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

Input.propTypes = {
  type: string.isRequired,
  name: string.isRequired,
  placeholder: string.isRequired,
  icon: string.isRequired,
};

export default Input;
