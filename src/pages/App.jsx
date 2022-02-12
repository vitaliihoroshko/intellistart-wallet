import { Routes, Route } from 'react-router-dom';

import LoginPage from './Login';
import RegisterPage from './Register';
import Layout from 'components/Layout';
import DashboardPage from './Dashboard';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Layout>
  );
};

export default App;
