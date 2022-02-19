import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { getTransactions, getTransactionCategories } from 'api/api-helper';
import styles from './styles.module.scss';

const Card = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionsCat, setTransactionsCat] = useState([]);
  let [currentPage, setCurrentPage] = useState(1);
  const token = useSelector(state => state.session.token);

  useEffect(() => {
    (async () => {
      const userTransactions = await getTransactions(token);
      const categories = await getTransactionCategories(token);
      setTransactionsCat(categories);
      setTransactions(userTransactions.reverse());
    })();
  }, [currentPage]);

  const data = transactions.slice(currentPage * 5 - 5, currentPage * 5).map(value => {
    return {
      ...value,
      categoryName: transactionsCat.find(category => category.id === value.categoryId).name,
      type: value.type === 'INCOME' ? '+' : '-',
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

  if (currentPage === 1) {
    buttonBackClasses = [styles['pagination__buttons'], styles['pagination__back']];
  } else if (currentPage === Math.ceil(transactions.length / 5)) {
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
        <button name="prevPage" onClick={handleClickBack} className={buttonBackClasses.join(' ')}>
          Back
        </button>
        <button name="nextPage" onClick={handleClickNext} className={buttonNextClasses.join(' ')}>
          Next
        </button>
      </div>
    );
  };
  return <div>{CreateCard()}</div>;
};

export default Card;
