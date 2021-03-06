import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SanRouter from './router';
import { BrowserRouter as Router } from 'react-router-dom';
// window.process.env = {
//   "NODE_ENV":"production"
// }

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <SanRouter />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);