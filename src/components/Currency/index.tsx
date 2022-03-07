import { VoidFunctionComponent, useState, useEffect } from 'react';
import { useMountedState } from 'react-use';

import { getCurrency, usd, eur, rur } from 'api/privat-api';
import { roundNumber } from 'utils/helperFunctions';
import styles from './styles.module.scss';

const Currency: VoidFunctionComponent = () => {
  const [usdPurchase, setUsdPurchase] = useState<number>();
  const [usdSale, setUsdSale] = useState<number>();
  const [eurPurchase, setEurPurchase] = useState<number>();
  const [eurSale, setEurSale] = useState<number>();
  const [rurPurchase, setRurPurchase] = useState<number>();
  const [rurSale, setRurSale] = useState<number>();
  const isMounted = useMountedState();

  useEffect(() => {
    (async () => {
      const data = await getCurrency();
      for (const element of data) {
        if (element.ccy === 'RUR' && isMounted()) {
          setRurPurchase(roundNumber(+element.buy));
          setRurSale(roundNumber(+element.sale));
        } else if (element.ccy === 'EUR' && isMounted()) {
          setEurPurchase(roundNumber(+element.buy));
          setEurSale(roundNumber(+element.sale));
        } else if (element.ccy === 'USD' && isMounted()) {
          setUsdPurchase(roundNumber(+element.buy));
          setUsdSale(roundNumber(+element.sale));
        }
      }
    })();
  }, []);

  const DenseTable = (): JSX.Element => {
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
          <tr className={styles['table_row']}>
            <td className={styles['currency__currency']}>{usd}</td>
            <td className={styles['currency__purchase']}>{usdPurchase}</td>
            <td className={styles['currency__sale']}>{usdSale}</td>
          </tr>
          <tr className={styles['table_row']}>
            <td className={styles['currency__currency']}>{eur}</td>
            <td className={styles['currency__purchase']}>{eurPurchase}</td>
            <td className={styles['currency__sale']}>{eurSale}</td>
          </tr>
          <tr className={styles['table_row']}>
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
