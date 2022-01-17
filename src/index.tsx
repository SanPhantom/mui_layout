import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SanRouter from './router';
import { BrowserRouter as Router } from 'react-router-dom';


ReactDOM.render(
  <React.StrictMode>
    {/* <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <SanRouter />
        </Route>
      </Routes>
    </Router> */}
    <Router>
      <SanRouter />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);