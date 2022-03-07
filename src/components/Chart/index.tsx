import { VoidFunctionComponent } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { TransactionsSummary, CategoryColors } from 'common/interfaces';
import { getСategoryColors } from 'utils/helperFunctions';
import styles from './styles.module.scss';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ChartProps {
  categories: TransactionsSummary | null;
}

const Chart: VoidFunctionComponent<ChartProps> = ({ categories }) => {
  const getData = (): number[] => {
    const data: number[] = [];
    if (categories?.categoriesSummary.length) {
      const totals = categories.categoriesSummary.map(category => category.total);
      data.push(...totals);
    } else data.push(0.0001);
    return data;
  };

  const getName = (): string[] => {
    const data: string[] = [];
    if (categories?.categoriesSummary.length) {
      const names = categories?.categoriesSummary?.map(i => ` ${i.name}`);
      data.push(...names);
    } else data.push(' You have no transactions');
    return data;
  };

  const getColor = (): string[] => {
    const data: string[] = [];
    if (categories?.categoriesSummary.length) {
      const colors = categories.categoriesSummary.map(
        category => getСategoryColors()[category.name.toLowerCase() as keyof CategoryColors],
      );
      data.push(...colors);
    } else data.push('#00AD84');
    return data;
  };

  return (
    <>
      <div className={styles.chart}>
        <p className={styles.title}>Statistics</p>
        <div className={styles.containerChart}>
          <div className={styles.doughnut}>
            <Doughnut
              data={{
                labels: getName(),
                datasets: [
                  {
                    label: '# of Votes',
                    data: getData(),
                    backgroundColor: getColor(),
                    borderColor: getColor(),
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                },
                cutout: 110,
              }}
              height={320}
              width={320}
            />
            <div className={styles.total}>
              ₴{' '}
              {categories?.periodTotal
                ? Math.abs((categories.periodTotal * 100) / 100).toFixed(2)
                : '0'}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chart;
