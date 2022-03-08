import { VoidFunctionComponent, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { State, SessionState } from 'store/types';
import { setPathname } from 'store/slices/global';
import { PageRoute } from 'common/enums';
import Layout from 'components/Layouts/MainLayout';

interface ProtectedRouteProps {
  element: JSX.Element;
  requiresAuth: boolean;
}

const ProtectedRoute: VoidFunctionComponent<ProtectedRouteProps> = ({ element, requiresAuth }) => {
  const { isAuth } = useSelector<State, SessionState>(state => state.session);
  const path = useSelector<State, string>(state => state.global.pathname);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === PageRoute.Home || pathname === PageRoute.Diagram) {
      dispatch(setPathname(pathname));
    }
  }, []);

  if (requiresAuth) {
    if (isAuth) return <Layout>{element}</Layout>;
    return <Navigate to={PageRoute.Login} replace />;
  }

  if (isAuth) return <Navigate to={path} replace />;
  return <>{element}</>;
};

export default ProtectedRoute;
