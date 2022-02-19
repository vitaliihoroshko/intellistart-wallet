import { useMemo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTable } from 'react-table';

import { getTransactions, getTransactionCategories } from 'api/api-helper';
import styles from './styles.module.scss';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionsCat, setTransactionsCat] = useState([]);
  const token = useSelector(state => state.session.token);

  useEffect(() => {
    (async () => {
      const userTransactions = await getTransactions(token);
      const categories = await getTransactionCategories(token);
      setTransactions(userTransactions);
      setTransactionsCat(categories);
    })();
  }, []);

  let amountClasses = [styles['dashboard__amount']];

  const columns = useMemo(
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
        accessor: 'categoryName',
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
  console.log(transactionsCat);
  const data = [...transactions];
  data.map(el => {
    //el.categoryName = transactionsCat.find(cat => cat.id === el.categoryId).name;
    if (el.type === 'INCOME') {
      el.type = '+';
    } else if (el.type === 'EXPENSE') {
      el.type = '-';
    }
    return el;
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
