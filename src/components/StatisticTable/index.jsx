import { useTable } from 'react-table';
import React from 'react';
import styles from './styles.module.scss';
import StatisticTableTotal from './StatisticTableTotal';
const StatisticTable = () => {
  const transactions = React.useMemo(() => [
    {
      categoryId: 'Products',
      amount: '300.00',
    },
    {
      categoryId: 'Self-care',
      amount: '800.00',
    },
    {
      categoryId: 'Car',
      amount: '7600.00',
    },
    {
      categoryId: 'Leisure',
      amount: '1000.00',
    },
    {
      categoryId: 'Products',
      amount: '300.00',
    },
    {
      categoryId: 'Self-care',
      amount: '800.00',
    },
    {
      categoryId: 'Car',
      amount: '7600.00',
    },
    {
      categoryId: 'Car',
      amount: '7600.00',
    },
    {
      categoryId: 'Leisure',
      amount: '1000.00',
    },
    // [],
  ]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Category',
        accessor: 'categoryId',
        className: styles['dashboard__category'],
      },
      {
        Header: 'Amount',
        accessor: 'amount',
        className: styles['dashboard__amount'],
      },
    ],
    [],
  );

  const tableInstance = useTable({ columns, data: transactions });
  const defaultPropGetter = () => ({});
  const {
    getTableProps,
    getTableBodyProps,
    rows,
    prepareRow,
    getColumnProps = defaultPropGetter,
    getCellProps = defaultPropGetter,
  } = tableInstance;

  // const categoryColor = [
  //   '#FED057',
  //   '#FFD8D0',
  //   '#FD9498',
  //   '#C5BAFF',
  //   '#6E78E8',
  //   '#4A56E2',
  //   '#81E1FF',
  //   '#24CCA7',
  //   '#00AD84',
  // ];

  const StatTable = () => {
    return (
      <div className={styles['dashboard']}>
        <div className={styles['dashboard__head']}>
          <h3 className={styles['dashboard__category']}>Category</h3>
          <h3 className={styles['dashboard__amount']}>Amount</h3>
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
                            style: cell.column.style,
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
  };
  return (
    <div>
      {StatTable()}
      <StatisticTableTotal />
    </div>
  );
};

export default StatisticTable;
