import React from 'react';
import styles from './styles.module.scss';
//import { getTransactions } from 'api/api-helper';

const Card = () => {
  //const trans = getTransactions();
  //const transactions = React.useMemo(() => [trans], []);
  const transactions = React.useMemo(() => [
    {
      id: 1,
      transactionDate: '24.01.2022',
      type: 'OUTCOME',
      categoryId: 'Other',
      userId: 'string',
      comment: 'A gift for wife',
      amount: '300.00',
      balanceAfter: '6900.00',
    },
    {
      id: 2,
      transactionDate: '26.01.2022',
      type: 'INCOME',
      categoryId: 'Regular Income',
      userId: 'string',
      comment: 'Bonus for January',
      amount: '8000.00',
      balanceAfter: '14900.00',
    },
  ]);
  const data = [...transactions];
  data.forEach(el => {
    if (el.type === 'INCOME') {
      el.type = '+';
    } else if (el.type === 'OUTCOME') {
      el.type = '-';
    }
  });

  const CreateCard = () => {
    return (
      <div>
        {transactions.map(item => {
          let tableClasses;
          let amountClasses;
          if (item.type === '+') {
            tableClasses = [styles.card, styles['card__greenline']];
            amountClasses = [styles['card__value'], styles['card__greentext']];
          } else if (item.type === '-') {
            tableClasses = [styles.card, styles['card__pinkline']];
            amountClasses = [styles['card__value'], styles['card__pinktext']];
          }
          console.log(item);
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
                  <td className={styles['card__value']}>{item.categoryId}</td>
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
