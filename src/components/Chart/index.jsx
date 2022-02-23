import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { getСategoryColors } from 'utils/helperFunctions';
import styles from './styles.module.scss';

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = ({ categories }) => {
  const getData = () => {
    let data = [];
    if (categories && categories?.categoriesSummary.length) {
      data = categories?.categoriesSummary?.map(i => i.total);
    } else {
      data = [0.0001];
    }
    return data;
  };

  const getName = () => {
    let data = [];
    if (categories && categories?.categoriesSummary.length) {
      data = categories?.categoriesSummary?.map(i => ` ${i.name}`);
    } else {
      data = [' You have no transactions'];
    }
    return data;
  };

  const getColor = () => {
    let data = [
      '#FED057',
      '#FFD8D0',
      '#FD9498',
      '#C5BAFF',
      '#6E78E8',
      '#4A56E2',
      '#81E1FF',
      '#24CCA7',
      '#00AD84',
    ];

    if (categories && categories?.categoriesSummary.length) {
      data = categories?.categoriesSummary?.map(i => getСategoryColors()[i.name.toLowerCase()]);
    } else {
      data = ['#00AD84'];
    }

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
                    cutout: 110,
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: false,
                },
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
