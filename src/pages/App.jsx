import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

import { autoSignIn } from 'store/slices/session/actions';
import LoginPage from './Login';
import RegisterPage from './Register';
import HomePage from './Dashboard/Home';
import DiagramPage from './Dashboard/Diagram';
import NotFoundPage from './NotFound';
import ProtectedRoute from 'components/ProtectedRoute';
import LoadingSpinner from 'components/LoadingSpinner';

const App = () => {
  const { isLoading } = useSelector(state => state.global);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(autoSignIn());
  }, []);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <Routes>
        {!isLoading && (
          <Route
            path="/login"
            element={<ProtectedRoute element={<LoginPage />} requiresAuth={false} />}
          />
        )}
        {!isLoading && (
          <Route
            path="/register"
            element={<ProtectedRoute element={<RegisterPage />} requiresAuth={false} />}
          />
        )}
        <Route
          path="/home"
          element={<ProtectedRoute element={<HomePage />} requiresAuth={true} />}
        />
        <Route
          path="/diagram"
          element={<ProtectedRoute element={<DiagramPage />} requiresAuth={true} />}
        />
        <Route path="/" element={<Navigate to="/home" replace />} />
        {!isLoading && <Route path="*" element={<NotFoundPage />} />}
      </Routes>
    </>
  );
};

export default App;
