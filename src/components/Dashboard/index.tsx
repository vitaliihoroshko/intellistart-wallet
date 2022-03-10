import { VoidFunctionComponent, useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTable, ColumnInstance, Cell, Row } from 'react-table';

import { State, SessionState, FinanceState } from 'store/types';
import { getTransactions, getTransactionCategories } from 'store/slices/finance/actions';
import { TableColumn } from 'common/interfaces';
import { TransformedTransaction } from 'common/types';
import { createDataToShow, chooseButtonsStyle } from 'utils/dashboardFunctions';
import styles from './styles.module.scss';

const Dashboard: VoidFunctionComponent = () => {
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

  const handleClickBack = (): void => setCurrentPage(prevValue => prevValue - 1);
  const handleClickNext = (): void => setCurrentPage(prevValue => prevValue + 1);

  const buttonsOptions = chooseButtonsStyle(currentPage, transactions);

  const columns: TableColumn[] = useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'transactionDate' as keyof TransformedTransaction,
        className: styles['dashboard__date'],
      },
      {
        Header: 'Type',
        accessor: 'type' as keyof TransformedTransaction,
        className: styles['dashboard__type'],
      },
      {
        Header: 'Category',
        accessor: 'categoryName' as keyof TransformedTransaction,
        className: styles['dashboard__category'],
      },
      {
        Header: 'Comment',
        accessor: 'comment' as keyof TransformedTransaction,
        className: styles['dashboard__comment'],
      },
      {
        Header: 'Amount',
        accessor: 'amount' as keyof TransformedTransaction,
        className: [styles['dashboard__amount']],
      },
      {
        Header: 'Balance',
        accessor: 'balanceAfter' as keyof TransformedTransaction,
        className: styles['dashboard__balance'],
      },
    ],
    [],
  );

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, rows, prepareRow } = tableInstance;

  const StatTable = (): JSX.Element => {
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
            {rows.map((row: Row<TransformedTransaction>) => {
              prepareRow(row);
              const { key, ...restRowProps } = row.getRowProps();
              return (
                <tr key={key} className={styles['dashboard__row']} {...restRowProps}>
                  {row.cells.map((cell: Cell<TransformedTransaction>) => {
                    const column = cell.column as ColumnInstance<TransformedTransaction> & {
                      className: string;
                    };
                    const { key, ...restCellProps } = cell.getCellProps({
                      className: column.className,
                      style: {
                        color:
                          row.original.type === '-' &&
                          column.className == styles['dashboard__amount']
                            ? '#ff6596'
                            : row.original.type === '+' &&
                              column.className == styles['dashboard__amount']
                            ? '#24cca7'
                            : 'black',
                      },
                    });
                    return (
                      <td key={key} {...restCellProps}>
                        {cell.render('Cell')}
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
  };

  return <div>{StatTable()}</div>;
};

export default Dashboard;
