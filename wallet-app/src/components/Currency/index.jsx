import styles from './styles.module.scss';

const Currency = () => {
  function createData(currency, purchase, sale) {
    purchase = (Math.round(purchase * 100) / 100).toFixed(2);
    sale = (Math.round(sale * 100) / 100).toFixed(2);
    return { currency, purchase, sale };
  }
  let usdPurchase = '27.55';
  let usdSale = '27.65';
  let eurSale = '30.10';
  let eurPurchase9 = '30.00';
  let rurPurchase = 0;
  let rurSale = 0;
  const rows = [
    createData('USD', usdPurchase, usdSale),
    createData('EUR', eurPurchase9, eurSale),
    createData('RUR', rurPurchase, rurSale),
  ];

  function DenseTable() {
    return (
      <table className={styles['currency__box']}>
        <thead className={styles['currency__head']}>
          <tr>
            <th className={styles['currency__currency']}>Currency</th>
            <th className={styles['currency__purchase']}>Purchase</th>
            <th className={styles['currency__sale']}>Sale</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key="">
              <td className={styles['currency__currency']}>{row.currency}</td>
              <td className={styles['currency__purchase']}>{row.purchase}</td>
              <td className={styles['currency__sale']}>{row.sale}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  return <div className={styles['currency__container']}>{DenseTable()}</div>;
};
export default Currency;
