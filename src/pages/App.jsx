import { Routes, Route } from 'react-router-dom';

import LoginPage from './Login';
import RegisterPage from './Register';
import Layout from 'components/Layout';
import Chart from 'components/Chart';
import Dashboard from './Dashboard';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/chart" element={<Chart />} />
        <Route path="/statistic" element={<Dashboard />} />
      </Routes>
    </Layout>
  );
};

export default App;
