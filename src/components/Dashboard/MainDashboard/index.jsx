import { getMonths, getYears, getСategoryColors } from 'utils/helperFunctions';
import Select from 'components/Select';
import styles from './styles.module.scss';

const Main = ({ categories, month, year, changeMonth, changeYear }) => {
  function getBgColor(name) {
    name = name.toLowerCase();
    let color = getСategoryColors()[name];

    return color || '#000';
  }

  return (
    <div className={styles['dashboard__wrapper']}>
      <div className={styles['dashboard__input__group']}>
        <div className={styles['dashboard__input__group__select']}>
          <Select
            options={[{ title: 'Month', value: '' }, ...getMonths()]}
            placeholder="Month"
            value={month}
            onChange={v => changeMonth(v)}
          />
        </div>
        <div className={styles['dashboard__input__group__select']}>
          <Select
            options={[{ title: 'Year', value: '' }, ...getYears()]}
            placeholder="Year"
            value={year}
            onChange={v => changeYear(v)}
          />
        </div>
      </div>
      {categories && (
        <>
          <div className={styles['dashboard__table']}>
            <div className={styles['dashboard__table__head']}>
              <div>Category</div>
              <div>Amount</div>
            </div>
            <div className={styles['dashboard__table__body']}>
              {categories?.categoriesSummary?.map(i => (
                <div key={i.name} className={styles['dashboard__table__item']}>
                  <div className={styles['dashboard__table__item__left']}>
                    <div
                      className={styles['dashboard__table__item__square']}
                      style={{ backgroundColor: getBgColor(i.name) }}
                    ></div>
                    <p>{i.name}</p>
                  </div>
                  <div className={styles['dashboard__table__item__right']}>{i.total}</div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles['dashboard__bottom']}>
            <div className={styles['dashboard__bottom__item']}>
              <div>Expenses:</div>
              <p className={styles['dashboard__bottom__item__red']}>{categories.expenseSummary}</p>
            </div>
            <div className={styles['dashboard__bottom__item']}>
              <div>Incomes:</div>
              <p className={styles['dashboard__bottom__item__green']}>{categories.incomeSummary}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Main;
