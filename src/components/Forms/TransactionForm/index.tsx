import { VoidFunctionComponent, useState, useEffect, useRef, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from 'formik';
import { object, number, date, string } from 'yup';
import DatePicker from 'components/DatePicker';
import moment from 'moment';

import { State, SessionState, FinanceState } from 'store/types';
import { setIsModalAddTransactionOpen } from 'store/slices/global';
import { Transaction, TransactionCategory } from 'common/interfaces';
import { TransactionType } from 'common/types';
import RegularButton from 'components/Buttons/RegularButton';
import { createTransaction } from 'store/slices/finance/actions';
import dropdownArrow from 'assets/images/select-arrow.svg';
import styles from './styles.module.scss';
import { Message } from 'yup/lib/types';

interface TransactionFormProps {
  modalIsOpened: boolean;
}

const TransactionForm: VoidFunctionComponent<TransactionFormProps> = ({ modalIsOpened }) => {
  const [checked, setChecked] = useState<boolean>(true);
  const [incomeCategory, setIncomeCategory] = useState<TransactionCategory>();
  const [expensesCategories, setExpensesCategories] = useState<TransactionCategory[]>([]);
  const [showCategories, setShowCategories] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const dropdownList = useRef<HTMLDivElement>(null);
  const { token } = useSelector<State, SessionState>(state => state.session);
  const { transactionCategories } = useSelector<State, FinanceState>(state => state.finance);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (modalIsOpened) {
        setIncomeCategory(transactionCategories.find(value => value.name === 'Income')!);
        setExpensesCategories(transactionCategories.filter(value => value.name !== 'Income'));
      }
    })();
  }, [modalIsOpened]);

  const handleShowCategories = (): void => setShowCategories(!showCategories);

  const handleClickOutside = (event: Event | MouseEvent<HTMLDivElement>): void => {
    const element = event.target as HTMLElement;
    if (dropdownList.current && !dropdownList.current.contains(element)) {
      setShowCategories(false);
    }
  };

  const handleShowError = (): void => setSubmitted(true);

  const closeHandler = (): void => {
    dispatch(setIsModalAddTransactionOpen(false));
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  type Values = Omit<Transaction, 'id' | 'userId' | 'balanceAfter'> & { checked: boolean };

  const initialValues: Values = {
    amount: '',
    transactionDate: new Date(),
    categoryId: '',
    comment: '',
    type: 'EXPENSE',
    checked,
  };

  const validationSchema = object({
    amount: number().required('This field is required').typeError('Amount must be a number'),
    transactionDate: date()
      .required('This field is required')
      .typeError('Date must be a dd.mm.yyyy format'),
    categoryId: checked
      ? string().test(
          'Category is chosen',
          'Category is not chosen' as Message,
          (): boolean => !!selected,
        )
      : string().notRequired(),
  });

  const submitHandler = (values: Values, actions: FormikHelpers<Values>): void => {
    const { amount, transactionDate, comment } = values;
    const transformedDate = moment(transactionDate).format().split('T')[0];

    const category = expensesCategories.find(value => value.name === selected);

    const createTransactionDto = {
      amount: checked ? +`-${amount}` : +amount,
      transactionDate: transformedDate,
      categoryId: checked ? category?.id! : incomeCategory?.id!,
      comment,
      type: checked ? ('EXPENSE' as TransactionType) : ('INCOME' as TransactionType),
    };

    dispatch(createTransaction(createTransactionDto, token!));
    actions.resetForm();
    setSelected('');
    closeHandler();
    setChecked(true);
    setSubmitted(false);
  };

  const classNames = [styles.dropdown__button, !selected && submitted ? styles.error_message : ''];

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
                  className={classNames.join(' ')}
                  onClick={handleShowCategories}
                />
                <img src={dropdownArrow} className={styles.dropdown__icon} alt="Dropdown arrow" />
                <div
                  ref={dropdownList}
                  onClick={handleClickOutside}
                  className={styles.dropdown__list_wrapper}
                >
                  <ul
                    onClick={event => {
                      const element = event.target as HTMLUListElement;
                      setSelected(element.textContent!);
                    }}
                    className={`${styles.dropdown__list} ${
                      !showCategories ? styles.dropdown__list_hiden : ''
                    }`}
                  >
                    {expensesCategories.map(category => (
                      <li
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
              <RegularButton clickHandler={handleShowError} type="submit">
                Add
              </RegularButton>
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

export default TransactionForm;
