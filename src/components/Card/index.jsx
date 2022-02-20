import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getTransactions, getTransactionCategories } from 'store/slices/finance/actions';
import styles from './styles.module.scss';

const Card = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { token } = useSelector(state => state.session);
  const { transactions } = useSelector(state => state.finance);
  const { transactionCategories } = useSelector(state => state.finance);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransactionCategories(token));
    dispatch(getTransactions(token));
  }, []);

  const data = transactions.slice(currentPage * 5 - 5, currentPage * 5).map(value => {
    return {
      ...value,
      categoryName: transactionCategories.find(category => category.id === value.categoryId)?.name,
      type: value.type === 'INCOME' ? '+' : '-',
      amount: Math.round((Math.abs(value.amount) * 100) / 100)
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ' '),
    };
  });

  const handleClickBack = () => {
    setCurrentPage(prevValue => prevValue - 1);
    window.scrollTo(0, 0);
  };
  const handleClickNext = () => {
    window.scrollTo(0, 0);
    setCurrentPage(prevValue => prevValue + 1);
  };

  let buttonBackClasses = [styles['pagination__buttons']];
  let buttonNextClasses = [styles['pagination__buttons']];
  let disabledBack = false;
  let disabledNext = false;

  if (currentPage === 1) {
    disabledBack = true;
    buttonBackClasses = [styles['pagination__buttons'], styles['pagination__back']];
  } else if (currentPage === Math.ceil(transactions.length / 5)) {
    disabledNext = true;
    buttonNextClasses = [styles['pagination__buttons'], styles['pagination__next']];
  }

  const CreateCard = () => {
    return (
      <div className={styles['card__container']}>
        {data.map(item => {
          let tableClasses;
          let amountClasses;
          if (item.type === '+') {
            tableClasses = [styles.card, styles['card__greenline']];
            amountClasses = [styles['card__value'], styles['card__greentext']];
          } else if (item.type === '-') {
            tableClasses = [styles['card'], styles['card__pinkline']];
            amountClasses = [styles['card__value'], styles['card__pinktext']];
          }
          return (
            <table key={item.id} className={tableClasses.join(' ')}>
              <tbody>
                <tr key={item.transactionDate}>
                  <td className={styles['card__key']}>Date</td>
                  <td className={styles['card__value']}>{item.transactionDate}</td>
                </tr>
                <tr>
                  <td className={styles['card__key']}>Type</td>
                  <td className={styles['card__value']}>{item.type}</td>
                </tr>
                <tr>
                  <td className={styles['card__key']}>Category</td>
                  <td className={styles['card__value']}>{item.categoryName}</td>
                </tr>
                <tr>
                  <td className={styles['card__key']}>Comments</td>
                  <td className={styles['card__value']}>{item.comment}</td>
                </tr>
                <tr>
                  <td className={styles['card__key']}>Amount</td>
                  <td className={amountClasses.join(' ')}>{item.amount}</td>
                </tr>
                <tr>
                  <td className={styles['card__key']}>Balance</td>
                  <td className={styles['card__value']}>{item.balanceAfter}</td>
                </tr>
              </tbody>
            </table>
          );
        })}
        <button
          name="prevPage"
          disabled={disabledBack}
          onClick={handleClickBack}
          className={buttonBackClasses.join(' ')}
        >
          Back
        </button>
        <button
          name="prevPage"
          disabled={disabledNext}
          onClick={handleClickNext}
          className={buttonNextClasses.join(' ')}
        >
          Next
        </button>
      </div>
    );
  };
  return <div>{CreateCard()}</div>;
};

export default Card;
