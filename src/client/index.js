import '@client/helpers/disableDevTools';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '@client/App';
import './index.scss';

ReactDOM.render(
  <Router basename={process.env.BASE_URL}>
    <App />
  </Router>,
  document.getElementById('app'),
);
