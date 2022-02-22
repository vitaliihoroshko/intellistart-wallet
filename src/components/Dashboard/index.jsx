import { useMemo, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTable } from 'react-table';

import { getTransactions, getTransactionCategories } from 'store/slices/finance/actions';
import { createDataToShow, chooseButtonsStyle } from 'utils/dashboardFunctions';
import styles from './styles.module.scss';

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { token } = useSelector(state => state.session);
  const { transactions } = useSelector(state => state.finance);
  const { transactionCategories } = useSelector(state => state.finance);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransactionCategories(token));
    dispatch(getTransactions(token));
  }, []);

  const data = createDataToShow(transactions, transactionCategories, currentPage);

  const handleClickBack = () => setCurrentPage(prevValue => prevValue - 1);
  const handleClickNext = () => setCurrentPage(prevValue => prevValue + 1);

  const buttonsOptions = chooseButtonsStyle(currentPage, transactions);

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
        className: [styles['dashboard__amount']],
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
                            style: {
                              color:
                                row.original.type === '-' &&
                                cell.column.className == styles['dashboard__amount']
                                  ? '#ff6596'
                                  : row.original.type === '+' &&
                                    cell.column.className == styles['dashboard__amount']
                                  ? '#24cca7'
                                  : 'black',
                            },
                          },
                          getColumnProps(cell.column),
                          getCellProps(cell),
                        )}
                      >
                        {cell.column == 'amount' && Math.abs(cell.render('Cell'))}
                        {cell.column != 'amount' && cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <button
          name="prevPage"
          disabled={buttonsOptions.disabledBack}
          onClick={handleClickBack}
          className={buttonsOptions.buttonBackClasses.join(' ')}
        >
          Back
        </button>
        <button
          name="nextPage"
          disabled={buttonsOptions.disabledNext}
          onClick={handleClickNext}
          className={buttonsOptions.buttonNextClasses.join(' ')}
        >
          Next
        </button>
      </div>
    );
  }

  return <div>{StatTable()}</div>;
};

export default Dashboard;
