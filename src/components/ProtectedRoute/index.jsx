import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { node } from 'prop-types';

import Layout from 'components/Layout';

const ProtectedRoute = ({ element }) => {
  const isAuth = useSelector(state => state.session.isAuth);

  if (isAuth) return <Layout>{element}</Layout>;

  return <Navigate to="/login" replace />;
};

ProtectedRoute.propTypes = {
  element: node.isRequired,
};

export default ProtectedRoute;
