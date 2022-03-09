import { VoidFunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { State, SessionState } from 'store/types';
import { PageRoute } from 'common/enums';
import styles from './styles.module.scss';

const NotFoundPage: VoidFunctionComponent = () => {
  const { isAuth } = useSelector<State, SessionState>(state => state.session);

  return (
    <>
      <div className={styles.background}>
        <div className={styles.wrapper}>
          <h1 className={styles.error}>404 error</h1>
          <p className={styles.msg}>Oh, you seem to be lost ...</p>
          <Link to={isAuth ? PageRoute.Home : PageRoute.Login} replace className={styles.link}>
            {isAuth ? 'home' : 'login'}
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
