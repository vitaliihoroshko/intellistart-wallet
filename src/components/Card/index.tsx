import { VoidFunctionComponent, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { State, SessionState, FinanceState } from 'store/types';
import { getTransactions, getTransactionCategories } from 'store/slices/finance/actions';
import { createDataToShow, chooseButtonsStyle } from 'utils/dashboardFunctions';
import styles from './styles.module.scss';

const Card: VoidFunctionComponent = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { token } = useSelector<State, SessionState>(state => state.session);
  const { transactions } = useSelector<State, FinanceState>(state => state.finance);
  const { transactionCategories } = useSelector<State, FinanceState>(state => state.finance);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(getTransactionCategories(token));
      dispatch(getTransactions(token));
    }
  }, []);

  const data = createDataToShow(transactions, transactionCategories, currentPage);

  const handleClickBack = (): void => {
    setCurrentPage(prevValue => prevValue - 1);
    window.scrollTo(0, 0);
  };

  const handleClickNext = (): void => {
    window.scrollTo(0, 0);
    setCurrentPage(prevValue => prevValue + 1);
  };

  const buttonsOptions = chooseButtonsStyle(currentPage, transactions);

  const CreateCard = () => {
    return (
      <div className={styles['card__container']}>
        {data.map(item => {
          const tableClasses: string[] = [styles.card];
          const amountClasses: string[] = [styles['card__value']];
          if (item.type === '+') {
            tableClasses.push(styles['card__greenline']);
            amountClasses.push(styles['card__greentext']);
          } else if (item.type === '-') {
            tableClasses.push(styles['card__pinkline']);
            amountClasses.push(styles['card__pinktext']);
          }
          return (
            <table key={item.id} className={tableClasses.join(' ')}>
              <tbody>
                <tr key={item.transactionDate as string}>
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
          disabled={buttonsOptions.disabledBack}
          onClick={handleClickBack}
          className={buttonsOptions.buttonBackClasses.join(' ')}
        >
          Back
        </button>
        <button
          name="prevPage"
          disabled={buttonsOptions.disabledNext}
          onClick={handleClickNext}
          className={buttonsOptions.buttonNextClasses.join(' ')}
        >
          Next
        </button>
      </div>
    );
  };
  return <div>{CreateCard()}</div>;
};

export default Card;
