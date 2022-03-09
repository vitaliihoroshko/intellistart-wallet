import { VoidFunctionComponent, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

import { State, GlobalState } from 'store/types';
import { autoSignIn } from 'store/slices/session/actions';
import { PageRoute } from 'common/enums';
import LoginPage from './Login';
import RegisterPage from './Register';
import HomePage from './Dashboard/Home';
import DiagramPage from './Dashboard/Diagram';
import NotFoundPage from './NotFound';
import ProtectedRoute from 'components/ProtectedRoute';
import LoadingSpinner from 'components/LoadingSpinner';

const App: VoidFunctionComponent = () => {
  const { isLoading } = useSelector<State, GlobalState>(state => state.global);
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
            path={PageRoute.Login}
            element={<ProtectedRoute element={<LoginPage />} requiresAuth={false} />}
          />
        )}
        {!isLoading && (
          <Route
            path={PageRoute.Register}
            element={<ProtectedRoute element={<RegisterPage />} requiresAuth={false} />}
          />
        )}
        <Route
          path={PageRoute.Home}
          element={<ProtectedRoute element={<HomePage />} requiresAuth={true} />}
        />
        <Route
          path={PageRoute.Diagram}
          element={<ProtectedRoute element={<DiagramPage />} requiresAuth={true} />}
        />
        <Route path={PageRoute.Default} element={<Navigate to={PageRoute.Home} replace />} />
        {!isLoading && <Route path={PageRoute.NotFound} element={<NotFoundPage />} />}
      </Routes>
    </>
  );
};

export default App;
