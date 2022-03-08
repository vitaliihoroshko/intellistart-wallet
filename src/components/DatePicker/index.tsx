import { VoidFunctionComponent } from 'react';
import DateView from 'react-datepicker';
import { Field, FormikProps, FieldInputProps } from 'formik';
import 'react-datepicker/dist/react-datepicker.css';

import calendar from 'assets/images/calendar.svg';
import styles from './styles.module.scss';

interface DatePickerProps {
  name: string;
}

const DatePicker: VoidFunctionComponent<DatePickerProps> = ({ name }) => {
  return (
    <div className={styles.date_input}>
      <Field name={name}>
        {({ form, field }: { form: FormikProps<string[]>; field: FieldInputProps<string> }) => {
          const { setFieldValue } = form;
          const { value } = field;
          return (
            <DateView
              dateFormat="dd.MM.yyyy"
              id={name}
              {...field}
              selected={value as unknown as Date}
              onChange={val => setFieldValue(name, val)}
            />
          );
        }}
      </Field>
      <img src={calendar} className={styles.calendar_icon} alt="Calendar" />
    </div>
  );
};

export default DatePicker;
