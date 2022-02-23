import { useEffect, useState } from 'react';
import { useMountedState } from 'react-use';

import { usd, eur, rur, getCurrency } from 'api/privat-api.js';
import { roundNumber } from 'utils/helperFunctions';
import styles from './styles.module.scss';

const Currency = () => {
  const [usdPurchase, setUsdPurchase] = useState();
  const [usdSale, setUsdSale] = useState();
  const [eurPurchase, setEurPurchase] = useState();
  const [eurSale, setEurSale] = useState();
  const [rurPurchase, setRurPurchase] = useState();
  const [rurSale, setRurSale] = useState();
  const isMounted = useMountedState();

  useEffect(() => {
    (async () => {
      const data = await getCurrency();
      for (const element of data) {
        if (element.ccy === 'RUR' && isMounted()) {
          setRurPurchase(roundNumber(element.buy));
          setRurSale(roundNumber(element.sale));
        } else if (element.ccy === 'EUR' && isMounted()) {
          setEurPurchase(roundNumber(element.buy));
          setEurSale(roundNumber(element.sale));
        } else if (element.ccy === 'USD' && isMounted()) {
          setUsdPurchase(roundNumber(element.buy));
          setUsdSale(roundNumber(element.sale));
        }
      }
    })();
  }, []);

  const DenseTable = () => {
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
  };
  return <div className={styles['currency__container']}>{DenseTable()}</div>;
};

export default Currency;
