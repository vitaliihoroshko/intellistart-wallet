import { useMemo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTable } from 'react-table';

import { getTransactions, getTransactionCategories } from 'api/api-helper';
import styles from './styles.module.scss';

const Dashboard = () => {
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

  const handleClickBack = () => setCurrentPage(prevValue => prevValue - 1);
  const handleClickNext = () => setCurrentPage(prevValue => prevValue + 1);

  let buttonBackClasses = [styles['pagination__buttons']];
  let buttonNextClasses = [styles['pagination__buttons']];

  if (currentPage === 1) {
    buttonBackClasses = [styles['pagination__buttons'], styles['pagination__back']];
  } else if (currentPage === Math.ceil(transactions.length / 5)) {
    buttonNextClasses = [styles['pagination__buttons'], styles['pagination__next']];
  }

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

  // rows.map(row => {
  //   if (row.type === '+') {
  //     amountClasses = [styles['dashboard__amount'], styles['dashboard__greentext']];
  //   } else if (row.type === '-') {
  //     amountClasses = [styles['dashboard__amount'], styles['dashboard__pinktext']];
  //   }
  // });

  function StatTable() {
    return (
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
        <button name="prevPage" onClick={handleClickBack} className={buttonBackClasses.join(' ')}>
          prevPage
        </button>
        <button name="nextPage" onClick={handleClickNext} className={buttonNextClasses.join(' ')}>
          nextPage
        </button>
      </div>
    );
  }

  return <div>{StatTable()}</div>;
};

export default Dashboard;
