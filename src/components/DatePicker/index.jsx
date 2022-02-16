import DateView from 'react-datepicker';
import { Field } from 'formik';
import 'react-datepicker/dist/react-datepicker.css';
import { string } from 'prop-types';

import styles from './styles.module.scss';
import { ReactComponent as Calendar } from '../../assets/images/calendar.svg';

const DatePicker = ({ name }) => {
  return (
    <div className={styles.date_input}>
      <Field name={name}>
        {({ form, field }) => {
          const { setFieldValue } = form;
          const { value } = field;
          return (
            <DateView
              dateFormat="dd.MM.yyyy"
              id={name}
              {...field}
              selected={value}
              onChange={val => setFieldValue(name, val)}
            />
          );
        }}
      </Field>
      <Calendar className={styles.calendar_icon} />
    </div>
  );
};

DatePicker.propTypes = {
  name: string,
};

export default DatePicker;
