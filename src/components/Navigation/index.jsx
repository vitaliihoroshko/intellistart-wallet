import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';

import { setIsCurrencyDisplayed } from 'store/slices/global';
import { useWindowWidth } from 'common/hooks';
import homeIcon from 'assets/images/home.svg';
import homeActiveIcon from 'assets/images/home-active.svg';
import diagramIcon from 'assets/images/diagram.svg';
import diagramActiveIcon from 'assets/images/diagram-active.svg';
import currencyIcon from 'assets/images/currency.svg';
import currencyActiveIcon from 'assets/images/currency-active.svg';
import styles from './styles.module.scss';

const Navigation = () => {
  const { isCurrencyDisplayed } = useSelector(state => state.global);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const windowWidth = useWindowWidth();

  useEffect(() => {
    if (windowWidth > 766 && isCurrencyDisplayed) dispatch(setIsCurrencyDisplayed(false));
  }, [windowWidth]);

  const icons = {
    home: pathname === '/home' && !isCurrencyDisplayed ? homeActiveIcon : homeIcon,
    diagram: pathname === '/diagram' && !isCurrencyDisplayed ? diagramActiveIcon : diagramIcon,
    currency: isCurrencyDisplayed ? currencyActiveIcon : currencyIcon,
  };

  const clickHandler = value => {
    if (isCurrencyDisplayed !== value) dispatch(setIsCurrencyDisplayed(value));
  };

  const activeLinkClassNames = [styles.link, styles['link-active']];
  const currencyItemClassNames = [styles.item, styles.currency];

  return (
    <ul className={styles.navigation}>
      <li className={styles.item} onClick={() => clickHandler(false)}>
        <NavLink
          to="/home"
          className={({ isActive }) => {
            return isActive && !isCurrencyDisplayed ? activeLinkClassNames.join(' ') : styles.link;
          }}
        >
          <img src={icons.home} alt="Home icon" width={18} height={18} />
          <p>Main</p>
        </NavLink>
      </li>
      <li className={styles.item} onClick={() => clickHandler(false)}>
        <NavLink
          to="/diagram"
          className={({ isActive }) => {
            return isActive && !isCurrencyDisplayed ? activeLinkClassNames.join(' ') : styles.link;
          }}
        >
          <img src={icons.diagram} alt="Diagram icon" width={18} height={18} />
          <p>Statistics</p>
        </NavLink>
      </li>
      <li className={currencyItemClassNames.join(' ')} onClick={() => clickHandler(true)}>
        <NavLink
          to={pathname}
          className={isCurrencyDisplayed ? activeLinkClassNames.join(' ') : styles.link}
        >
          <img src={icons.currency} alt="Currency icon" width={38} height={38} />
        </NavLink>
      </li>
    </ul>
  );
};

export default Navigation;
