import { useState } from 'react';
import styles from './styles.module.scss';

const allMonths = [
  'Всі місяці',
  'Січень',
  'Лютий',
  'Березень',
  'Квітень',
  'Травень',
  'Червень',
  'Липень',
  'Серпень',
  'Вересень',
  'Жовтень',
  'Листопад',
  'Грудень',
];

const allYears = [
  'Рік',
  2022,
  2021,
  2020,
  2019,
  2018,
  2017,
  2016,
  2015,
  2014,
  2013,
  2012,
  2011,
  2010,
];

const Dropdown = () => {
  const date = new Date();
  const [monthsState, setMonthState] = useState(() => allMonths[date.getUTCMonth() + 1]);
  const [yearsState, setYearState] = useState(() => date.getFullYear());

  const validateMounth = e => {
    const b = allMonths.indexOf(e.target.value);
    setMonthState(e.target.value);

    if (b === allMonths[0]) {
      //   setRequestedMonth('');
      return;
    }
    //  setRequestedMonth(b);
  };

  const validateYears = e => {
    if (e.target.value === 'Год') {
      return;
    }
    //  setRequestedYear(e.target.value);
    setYearState(e.target.value);
  };

  return (
    <div>
      <form className={styles.form}>
        <select
          name="SelectedMounth"
          className={styles.select}
          id="area"
          onChange={validateMounth}
          value={monthsState}
        >
          {allMonths.map(month => (
            <option key={month}>{month}</option>
          ))}
        </select>
        <select
          name="SelectedYears"
          className={styles.select}
          id="area"
          onChange={validateYears}
          value={yearsState}
        >
          {allYears.map(year => (
            <option key={year}>{year}</option>
          ))}
        </select>
      </form>
    </div>
  );
};
export default Dropdown;
