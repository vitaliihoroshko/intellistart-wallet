import React from 'react';
import styles from './styles.module.scss';
//import { getTransactions } from 'api/api-helper';

const Card = () => {
  //   respArr.forEach(item => {
  //     element.insertAdjacentHTML("beforeEnd", `<div class="photo-card">
  // <img src="${item.previewURL}" alt="${item.tags}" loading="lazy"/>
  // <div class="info">
  //   <p class="info-item">
  //     <b>Likes - ${item.likes}</b>
  //   </p>
  //   <p class="info-item">
  //     <b>Views - ${item.views}</b>
  //   </p>
  //   <p class="info-item">
  //     <b>Comments - ${item.comments}</b>
  //   </p>
  //   <p class="info-item">
  //     <b>Downloads - ${item.downloads}</b>
  //   </p>
  // </div>
  // </div>`);
  // });
  //const trans = getTransactions();
  //const transactions = React.useMemo(() => [trans], []);
  const transactions = React.useMemo(() => [
    {
      id: '01',
      transactionDate: '24.01.2022',
      type: 'OUTCOME',
      categoryId: 'Other',
      userId: 'string',
      comment: 'A gift for wife',
      amount: '300.00',
      balanceAfter: '6900.00',
    },
    {
      id: '02',
      transactionDate: '26.01.2022',
      type: 'INCOME',
      categoryId: 'Regular Income',
      userId: 'string',
      comment: 'Bonus for January',
      amount: '8000.00',
      balanceAfter: '14900.00',
    },
    [],
  ]);

  //const columns = React.useMemo(
  //   () => [
  //     {
  //       Header: 'Key',
  //       accessor: 'key',
  //       className: styles['dashboard__date'],
  //     },
  //     {
  //       Header: 'Value',
  //       accessor: 'value',
  //       className: styles['dashboard__type'],
  //     },
  //   ],
  //   [],
  // );

  const data = [...transactions];
  data.forEach(el => {
    if (el.type === 'INCOME') {
      el.type = '+';
    } else if (el.type === 'OUTCOME') {
      el.type = '-';
    }
  });

  function CreateCard() {
    return <div className={styles['card']}></div>;
  }
  return <div>{CreateCard()}</div>;
};

export default Card;
