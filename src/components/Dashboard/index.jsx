import { useTable } from 'react-table';
import React from 'react';
import styles from './styles.module.scss';
//import { getTransactions } from 'api/api-helper';

const Dashboard = () => {
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
  let amountClasses = [styles['dashboard__amount']];

  const columns = React.useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'transactionDate',
        className: styles['dashboard__date'],
      },
      {
        Header: 'Type',
        accessor: 'type',
        className: styles['dashboard__type'],
      },
      {
        Header: 'Category',
        accessor: 'categoryId',
        className: styles['dashboard__category'],
      },
      {
        Header: 'Comment',
        accessor: 'comment',
        className: styles['dashboard__comment'],
      },
      {
        Header: 'Amount',
        accessor: 'amount',
        className: amountClasses.join(' '),
      },
      {
        Header: 'Balance',
        accessor: 'balanceAfter',
        className: styles['dashboard__balance'],
      },
    ],
    [],
  );

  const data = [...transactions];
  data.forEach(el => {
    if (el.type === 'INCOME') {
      el.type = '+';
    } else if (el.type === 'OUTCOME') {
      el.type = '-';
    }
  });

  const tableInstance = useTable({ columns, data });
  const defaultPropGetter = () => ({});
  const {
    getTableProps,
    getTableBodyProps,
    rows,
    prepareRow,
    getColumnProps = defaultPropGetter,
    getCellProps = defaultPropGetter,
  } = tableInstance;

  rows.map(row => {
    if (row.type === '+') {
      amountClasses = [styles['dashboard__amount'], styles['dashboard__greentext']];
    } else if (row.type === '-') {
      amountClasses = [styles['dashboard__amount'], styles['dashboard__pinktext']];
    }
  });

  function StatTable() {
    return (
      // apply the table props
      <div className={styles['dashboard']}>
        <div className={styles['dashboard__head']}>
          <h3 className={styles['dashboard__date']}>Date</h3>
          <h3 className={styles['dashboard__type']}>Type</h3>
          <h3 className={styles['dashboard__category']}>Category</h3>
          <h3 className={styles['dashboard__comment']}>Comments</h3>
          <h3 className={styles['dashboard__amount']}>Amount</h3>
          <h3 className={styles['dashboard__balance']}>Balance</h3>
        </div>
        <table {...getTableProps()}>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr
                  key={row.transactionDate}
                  className={styles['dashboard__row']}
                  {...row.getRowProps()}
                >
                  {row.cells.map(cell => {
                    return (
                      <td
                        key={columns.accessor}
                        {...cell.getCellProps(
                          {
                            className: cell.column.className,
                          },
                          getColumnProps(cell.column),
                          getCellProps(cell),
                        )}
                      >
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
  return <div>{StatTable()}</div>;
};

export default Dashboard;
