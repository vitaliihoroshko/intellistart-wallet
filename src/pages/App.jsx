import { Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './Login';
import RegisterPage from './Register';
import ProtectedRoute from 'components/ProtectedRoute';
import DiagramPage from './Diagram';

const App = () => {
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
        element={<ProtectedRoute element={<DiagramPage />} requiresAuth={true} />}
      />
      <Route
        path="/diagram"
        element={<ProtectedRoute element={<DiagramPage />} requiresAuth={true} />}
      />
      <Route path="/" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};

export default App;
