import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { node } from 'prop-types';

import Navigation from 'components/Navigation';
import Balance from 'components/Balance';
import Currency from 'components/Currency';
import { useWindowWidth } from 'common/hooks';
import styles from './styles.module.scss';

const DashboardPageLayout = ({ children }) => {
  const windowWidth = useWindowWidth();
  const { isCurrencyDisplayed } = useSelector(state => state.global);
  const { isModalAddTransactionOpen } = useSelector(state => state.global);
  const { pathname } = useLocation();

  const isMobile = windowWidth <= 767;
  const balanceIsShown = (isMobile && !isCurrencyDisplayed && pathname === '/home') || !isMobile;
  const contentIsShown = (isMobile && !isCurrencyDisplayed) || !isMobile;
  const currencyIsShown = !contentIsShown || !isMobile;

  const classNames = [
    styles.background,
    isModalAddTransactionOpen && windowWidth <= 480 ? styles['hide-content'] : '',
  ];

  return (
    <div className={classNames.join(' ')}>
      <div className={styles.layout}>
        <div>
          <Navigation />
          {balanceIsShown && <Balance />}
        </div>
        {currencyIsShown && <Currency />}
      </div>
      {contentIsShown && <>{children}</>}
    </div>
  );
};

DashboardPageLayout.propTypes = {
  children: node.isRequired,
};

export default DashboardPageLayout;
