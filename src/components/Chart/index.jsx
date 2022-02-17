import { useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import styles from './styles.module.scss';
import Balance from '../Balance';
import { getChartData } from '../../api/api-helper';
import { useSelector } from 'react-redux';
// import Currency from '../Currency';

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = () => {
  const token = useSelector(state => state.session.token);

  useEffect(() => {
    (async () => {
      const chartData = await getChartData(token, 2020, 6);
      console.log(chartData);
    })();
  }, []);

  return (
    <>
      {/* <Currency /> */}
      <div className={styles.chart}>
        <p className={styles.title}>Statistics</p>
        <div className={styles.containerChart}>
          <Balance />
          <div className={styles.doughnut}>
            <Doughnut
              data={{
                datasets: [
                  {
                    label: '# of Votes',
                    data: [8700, 3800, 1500, 800, 2200, 300, 3400, 1230, 610],
                    backgroundColor: [
                      '#FED057',
                      '#FFD8D0',
                      '#FD9498',
                      '#C5BAFF',
                      '#6E78E8',
                      '#4A56E2',
                      '#81E1FF',
                      '#24CCA7',
                      '#00AD84',
                    ],
                    borderColor: [
                      '#FED057',
                      '#FFD8D0',
                      '#FD9498',
                      '#C5BAFF',
                      '#6E78E8',
                      '#4A56E2',
                      '#81E1FF',
                      '#24CCA7',
                      '#00AD84',
                    ],
                    borderWidth: 1,
                    cutout: 110,
                  },
                ],
              }}
              options={{ maintainAspectRatio: false }}
              height={320}
              width={320}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Chart;
