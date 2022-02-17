import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

import { autoSignIn } from 'store/slices/session/actions';
import LoginPage from './Login';
import RegisterPage from './Register';
import ProtectedRoute from 'components/ProtectedRoute';
import DashboardPage from './Dashboard';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(autoSignIn());
  }, []);

  return (
    <Routes>
      <Route
        path="/login"
        element={<ProtectedRoute element={<LoginPage />} requiresAuth={false} />}
      />
      <Route
        path="/register"
        element={<ProtectedRoute element={<RegisterPage />} requiresAuth={false} />}
      />
      <Route
        path="/home"
        element={<ProtectedRoute element={<DashboardPage />} requiresAuth={true} />}
      />
      <Route
        path="/diagram"
        element={<ProtectedRoute element={<DashboardPage />} requiresAuth={true} />}
      />
      <Route path="/" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};

export default App;
