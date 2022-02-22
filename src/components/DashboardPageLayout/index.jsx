import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { node } from 'prop-types';

import Navigation from 'components/Navigation';
import Balance from 'components/Balance';
import Currency from 'components/Currency';
import useWindowWidth from 'hooks/useWindowWidth';
import styles from './styles.module.scss';

const DashboardPageLayout = ({ children }) => {
  const width = useWindowWidth();
  const { isCurrencyDisplayed } = useSelector(state => state.global);
  const { pathname } = useLocation();

  const isMobile = width <= 767;
  const balanceIsShown = (isMobile && !isCurrencyDisplayed && pathname === '/home') || !isMobile;
  const contentIsShown = (isMobile && !isCurrencyDisplayed) || !isMobile;
  const currencyIsShown = !contentIsShown || !isMobile;

  return (
    <>
      <div className={styles.layout}>
        <div>
          <Navigation />
          {balanceIsShown && <Balance />}
        </div>
        {currencyIsShown && <Currency />}
      </div>
      {contentIsShown && <>{children}</>}
    </>
  );
};

DashboardPageLayout.propTypes = {
  children: node.isRequired,
};

export default DashboardPageLayout;
