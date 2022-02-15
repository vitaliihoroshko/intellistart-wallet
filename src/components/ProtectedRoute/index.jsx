import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { node, bool } from 'prop-types';

import Layout from 'components/Layout';

const ProtectedRoute = ({ element, requiresAuth }) => {
  const isAuth = useSelector(state => state.session.isAuth);

  if (requiresAuth) {
    if (isAuth) return <Layout>{element}</Layout>;
    return <Navigate to="/login" replace />;
  }

  if (isAuth) return <Navigate to="/home" replace />;
  return <>{element}</>;
};

ProtectedRoute.propTypes = {
  element: node.isRequired,
  requiresAuth: bool,
};

export default ProtectedRoute;
