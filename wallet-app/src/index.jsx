import { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import App from './pages/App';
import './styles/index.scss';

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);
