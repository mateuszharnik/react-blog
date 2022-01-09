import '@client/helpers/disableDevTools';
import React from 'react';
import { render } from 'react-dom';
import { StoreProvider } from 'easy-peasy';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '@client/App';
import store from '@client/store/index.store';
import './index.scss';

render(
  <StoreProvider store={store}>
    <Router basename={process.env.BASE_URL}>
      <App />
    </Router>
  </StoreProvider>,
  document.getElementById('app'),
);
