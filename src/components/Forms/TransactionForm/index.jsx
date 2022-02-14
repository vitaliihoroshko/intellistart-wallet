import styles from './styles.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import DatePicker from 'react-datepicker';
import { ReactComponent as Calendar } from 'assets/images/calendar.svg';
import RegularButton from 'components/Buttons/RegularButton';

const TransactionForm = () => {
  const [checked, setChecked] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  return (
    <>
      <div className={styles['form_wrapper']}>
        <Formik>
          <Form>
            <div className={styles['check_box']}>
              <p className={`${styles.check_box__option} ${!checked ? styles.income : ''}`}>
                Income
              </p>
              <label className={styles['switch']}>
                <input
                  className={styles['switch']}
                  type="checkbox"
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                  name="type"
                />
                <div className={styles['back']}>
                  <div className={styles['indicator']}></div>
                </div>
              </label>
              <p className={`${styles.check_box__option} ${checked ? styles.expenses : ''}`}>
                Expenses
              </p>
            </div>
            <div className={`${styles.input} ${styles.amount_date_wrapper}`}>
              <Field type="text" name="amount" placeholder="0.00" />
              <div className={styles.date_wrapper}>
                <DatePicker
                  dateFormat="dd.MM.yyyy"
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  calendarIcon={Calendar}
                />
                <Calendar className={styles.calendar_icon} />
              </div>
            </div>
            <div className={`${styles.input} ${styles.comment_input}`}>
              <Field type="textarea" name="comment" placeholder="Comments" />
            </div>
            <div className={styles.modal_btns}>
              <RegularButton type="submit">Add</RegularButton>
              <RegularButton isTransparent={true}>Cancel</RegularButton>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default TransactionForm;
