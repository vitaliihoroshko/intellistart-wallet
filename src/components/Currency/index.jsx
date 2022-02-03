import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { usd, eur, rur, apiCall } from './privat-api.js';

function Round(num) {
  return (Math.round(num * 100) / 100).toFixed(2);
}

const Currency = () => {
  const [usdPurchase, setUsdPurchase] = useState();
  const [usdSale, setUsdSale] = useState();
  const [eurPurchase, setEurPurchase] = useState();
  const [eurSale, setEurSale] = useState();
  const [rurPurchase, setRurPurchase] = useState();
  const [rurSale, setRurSale] = useState();
  useEffect(() => {
    (async () => {
      const data = await apiCall();
      for (const element of data) {
        if (element.ccy == 'RUR') {
          setRurPurchase(Round(element.buy));
          setRurSale(Round(element.sale));
        } else if (element.ccy == 'EUR') {
          setEurPurchase(Round(element.buy));
          setEurSale(Round(element.sale));
        } else if (element.ccy == 'USD') {
          setUsdPurchase(Round(element.buy));
          setUsdSale(Round(element.sale));
        }
      }
    })();
  });
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
          <tr>
            <td className={styles['currency__currency']}>{usd}</td>
            <td className={styles['currency__purchase']}>{usdPurchase}</td>
            <td className={styles['currency__sale']}>{usdSale}</td>
          </tr>
          <tr>
            <td className={styles['currency__currency']}>{eur}</td>
            <td className={styles['currency__purchase']}>{eurPurchase}</td>
            <td className={styles['currency__sale']}>{eurSale}</td>
          </tr>
          <tr>
            <td className={styles['currency__currency']}>{rur}</td>
            <td className={styles['currency__purchase']}>{rurPurchase}</td>
            <td className={styles['currency__sale']}>{rurSale}</td>
          </tr>
        </tbody>
      </table>
    );
  }
  return <div className={styles['currency__container']}>{DenseTable()}</div>;
};
export default Currency;
