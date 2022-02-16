import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { object, number, date } from 'yup';
import DatePicker from 'components/DatePicker';
import { bool } from 'prop-types';
import moment from 'moment';

import { setIsModalAddTransactionOpen } from 'store/slices/global';
import RegularButton from 'components/Buttons/RegularButton';
import { getTransactionCategories, createTransaction } from 'api/api-helper';
import styles from './styles.module.scss';

const TransactionForm = ({ modalIsOpened }) => {
  const [checked, setChecked] = useState(false);
  const [incomeCategory, setIncomeCategory] = useState({});
  const [expensesCategories, setExpensesCategories] = useState([]);
  const token = useSelector(state => state.session.token);
  const dispatch = useDispatch();
  const closeHandler = () => dispatch(setIsModalAddTransactionOpen(false));

  useEffect(() => {
    (async () => {
      if (modalIsOpened) {
        const categories = await getTransactionCategories(token);
        setIncomeCategory(categories.find(value => value.name === 'Доход'));
        setExpensesCategories(categories.filter(value => value.name !== 'Доход'));
      }
    })();
  }, [modalIsOpened]);

  const initialValues = {
    amount: '',
    transactionDate: '',
    categoryId: '',
    comment: '',
  };

  const validationSchema = object({
    amount: number().required('This field is required').typeError('Amount must be a number'),
    transactionDate: date()
      .required('This field is required')
      .typeError('Date must be a dd.mm.yyyy format'),
  });

  const submitHandler = async values => {
    const { amount, transactionDate, categoryId, comment } = values;
    const transformedDate = moment(transactionDate).format();

    const transaction = await createTransaction(
      {
        amount: checked ? +`-${amount}` : +amount,
        transactionDate: transformedDate,
        categoryId: checked ? categoryId : incomeCategory.id,
        comment,
        type: checked ? 'EXPENSE' : 'INCOME',
      },
      token,
    );
    console.log(transaction);
  };

  return (
    <>
      <div className={styles['form_wrapper']}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submitHandler}
        >
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
            {checked && (
              <div className={styles.select_wrapper}>
                <Field as="select" name="categoryId">
                  <option value="" disabled hidden>
                    Select a category
                  </option>
                  {expensesCategories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Field>
              </div>
            )}
            <div className={`${styles.input} ${styles.amount_date_wrapper}`}>
              <div className={styles.amount_wrapper}>
                <Field type="text" name="amount" placeholder="0.00" />
                <p className={styles.error}>
                  <ErrorMessage name="amount" />
                </p>
              </div>
              <div className={styles.date_wrapper}>
                <DatePicker name="transactionDate" />
                <p className={styles.error}>
                  <ErrorMessage name="transactionDate" />
                </p>
              </div>
            </div>
            <div className={`${styles.input} ${styles.comment_input}`}>
              <Field type="textarea" name="comment" placeholder="Comments" />
            </div>
            <div className={styles.modal_btns}>
              <RegularButton type="submit">Add</RegularButton>
              <RegularButton isTransparent={true} clickHandler={closeHandler}>
                Cancel
              </RegularButton>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};

TransactionForm.propTypes = {
  modalIsOpened: bool,
};

export default TransactionForm;
