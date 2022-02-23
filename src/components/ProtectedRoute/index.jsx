import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { node, bool } from 'prop-types';

import { setPathname } from 'store/slices/global';
import Layout from 'components/Layouts/MainLayout';

const ProtectedRoute = ({ element, requiresAuth }) => {
  const { isAuth } = useSelector(state => state.session);
  const path = useSelector(state => state.global.pathname);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/home' || pathname === '/diagram') dispatch(setPathname(pathname));
  }, []);

  if (requiresAuth) {
    if (isAuth) return <Layout>{element}</Layout>;
    return <Navigate to="/login" replace />;
  }

  if (isAuth) return <Navigate to={path} replace />;
  return <>{element}</>;
};

ProtectedRoute.propTypes = {
  element: node.isRequired,
  requiresAuth: bool,
};

export default ProtectedRoute;
