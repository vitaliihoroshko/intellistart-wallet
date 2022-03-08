import { VoidFunctionComponent, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';

import { State, GlobalState } from 'store/types';
import { setIsCurrencyDisplayed } from 'store/slices/global';
import { PageRoute } from 'common/enums';
import { NavigationIcons } from 'common/interfaces';
import { useWindowWidth } from 'common/hooks';
import homeIcon from 'assets/images/home.svg';
import homeActiveIcon from 'assets/images/home-active.svg';
import diagramIcon from 'assets/images/diagram.svg';
import diagramActiveIcon from 'assets/images/diagram-active.svg';
import currencyIcon from 'assets/images/currency.svg';
import currencyActiveIcon from 'assets/images/currency-active.svg';
import styles from './styles.module.scss';

const Navigation: VoidFunctionComponent = () => {
  const { isCurrencyDisplayed } = useSelector<State, GlobalState>(state => state.global);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const windowWidth = useWindowWidth();

  useEffect(() => {
    if (windowWidth > 766 && isCurrencyDisplayed) dispatch(setIsCurrencyDisplayed(false));
  }, [windowWidth]);

  const icons: NavigationIcons = {
    home: pathname === PageRoute.Home && !isCurrencyDisplayed ? homeActiveIcon : homeIcon,
    diagram:
      pathname === PageRoute.Diagram && !isCurrencyDisplayed ? diagramActiveIcon : diagramIcon,
    currency: isCurrencyDisplayed ? currencyActiveIcon : currencyIcon,
  };

  const clickHandler = (value: boolean): void => {
    if (isCurrencyDisplayed !== value) dispatch(setIsCurrencyDisplayed(value));
  };

  const activeLinkClassNames: string[] = [styles.link, styles['link-active']];
  const currencyItemClassNames: string[] = [styles.item, styles.currency];

  return (
    <ul className={styles.navigation}>
      <li className={styles.item} onClick={() => clickHandler(false)}>
        <NavLink
          to={PageRoute.Home}
          className={({ isActive }: { isActive: boolean }): string => {
            return isActive && !isCurrencyDisplayed ? activeLinkClassNames.join(' ') : styles.link;
          }}
        >
          <img src={icons.home} alt="Home icon" width={18} height={18} />
          <p>Main</p>
        </NavLink>
      </li>
      <li className={styles.item} onClick={() => clickHandler(false)}>
        <NavLink
          to={PageRoute.Diagram}
          className={({ isActive }: { isActive: boolean }): string => {
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
