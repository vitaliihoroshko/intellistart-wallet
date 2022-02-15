import { Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './Login';
import RegisterPage from './Register';
import ProtectedRoute from 'components/ProtectedRoute';
import DashboardPage from './Dashboard';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/home" element={<ProtectedRoute element={<DashboardPage />} />} />
      <Route path="/diagram" element={<ProtectedRoute element={<DashboardPage />} />} />
      <Route path="/" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};

export default App;
