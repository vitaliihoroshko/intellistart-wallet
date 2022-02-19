import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { getTransactions, getTransactionCategories } from 'api/api-helper';
import styles from './styles.module.scss';

const Card = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionsCat, setTransactionsCat] = useState([]);
  const token = useSelector(state => state.session.token);

  useEffect(() => {
    (async () => {
      const userTransactions = await getTransactions(token);
      const categories = getTransactionCategories(token);
      setTransactions(userTransactions);
      setTransactionsCat(categories);
    })();
  }, []);

  console.log(transactionsCat);
  const data = [...transactions];
  data.map(el => {
    //el.categoryName = transactionsCat.find(cat => cat.id === el.categoryId).name;
    if (el.type === 'INCOME') {
      el.type = '+';
    } else if (el.type === 'EXPENSE') {
      el.type = '-';
    }
  });

  const CreateCard = () => {
    return (
      <div>
        {data.map(item => {
          let tableClasses;
          let amountClasses;
          if (item.type === '+') {
            tableClasses = [styles.card, styles['card__greenline']];
            amountClasses = [styles['card__value'], styles['card__greentext']];
          } else if (item.type === '-') {
            tableClasses = [styles.card, styles['card__pinkline']];
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
      </div>
    );
  };
  return <div>{CreateCard()}</div>;
};

export default Card;
