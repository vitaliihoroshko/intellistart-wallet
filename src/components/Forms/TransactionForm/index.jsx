import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { object, number, date, string } from 'yup';
import DatePicker from 'components/DatePicker';
import { bool } from 'prop-types';
import moment from 'moment';

import { setIsModalAddTransactionOpen } from 'store/slices/global';
import RegularButton from 'components/Buttons/RegularButton';
import { createTransaction } from 'store/slices/finance/actions';
import dropdownArrow from 'assets/images/dropdown-arrow.svg';
import styles from './styles.module.scss';

const TransactionForm = ({ modalIsOpened }) => {
  const [checked, setChecked] = useState(false);
  const [incomeCategory, setIncomeCategory] = useState({});
  const [expensesCategories, setExpensesCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const [selected, setSelected] = useState('');
  const dropdownList = useRef(null);
  const { token } = useSelector(state => state.session);
  const { transactionCategories } = useSelector(state => state.finance);
  const dispatch = useDispatch();
  const closeHandler = () => dispatch(setIsModalAddTransactionOpen(false));

  useEffect(() => {
    (async () => {
      if (modalIsOpened) {
        setIncomeCategory(transactionCategories.find(value => value.name === 'Income'));
        setExpensesCategories(transactionCategories.filter(value => value.name !== 'Income'));
      }
    })();
  }, [modalIsOpened]);

  const handleShowCategories = () => {
    setShowCategories(!showCategories);
  };

  const handleClickOutside = event => {
    if (dropdownList.current && !dropdownList.current.contains(event.target)) {
      setShowCategories(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  const initialValues = {
    amount: '',
    transactionDate: new Date(),
    categoryId: '',
    comment: '',
    type: '',
  };

  const validationSchema = object({
    amount: number().required('This field is required').typeError('Amount must be a number'),
    transactionDate: date()
      .required('This field is required')
      .typeError('Date must be a dd.mm.yyyy format'),
    categoryId: checked ? string().test('Required', 'This field is required', () => selected) : '',
  });

  const submitHandler = async (values, actions) => {
    const { amount, transactionDate, comment } = values;
    const transformedDate = moment(transactionDate).format().split('T')[0];

    const category = expensesCategories.find(value => value.name === selected);

    const createTransactionDto = {
      amount: checked ? +`-${amount}` : +amount,
      transactionDate: transformedDate,
      categoryId: checked ? category.id : incomeCategory.id,
      comment,
      type: checked ? 'EXPENSE' : 'INCOME',
    };
    dispatch(createTransaction(createTransactionDto, token));
    actions.resetForm();
    setSelected('');
    closeHandler();
    setChecked(false);
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
                <Field
                  name="categoryId"
                  placeholder="Select a category"
                  autoComplete="off"
                  value={selected}
                  className={styles.dropdown__button}
                  onClick={handleShowCategories}
                />
                <img src={dropdownArrow} className={styles.dropdown__icon} alt="Dropdown arrow" />
                <p className={styles.error}>
                  <ErrorMessage name="categoryId" />
                </p>
                <div
                  ref={dropdownList}
                  onClick={handleClickOutside}
                  className={styles.dropdown__list_wrapper}
                >
                  <ul
                    onClick={e => setSelected(e.target.textContent)}
                    className={`${styles.dropdown__list} ${
                      !showCategories ? [styles.dropdown__list_hiden] : ''
                    }`}
                  >
                    {expensesCategories.map(category => (
                      <li
                        name="categoryId"
                        key={category.id}
                        className={styles.dropdown__list_item}
                        value={category.id}
                        onClick={handleShowCategories}
                      >
                        <p>{category.name}</p>
                      </li>
                    ))}
                  </ul>
                </div>
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
