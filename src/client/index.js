import '@client/helpers/disableDevTools';
import React from 'react';
import { render } from 'react-dom';
import { StoreProvider } from 'easy-peasy';
import { BrowserRouter as Router } from 'react-router-dom';
import { init } from 'aos';
import setInterceptors from '@client/helpers/libs/axios/interceptors';
import store from '@client/store/index.store';
import App from '@client/App';
import './index.scss';

(async () => {
  init({
    once: true,
  });

  try {
    const axios = (await import(/* webpackChunkName: 'axios' */ '@client/helpers/libs/axios')).default;
    setInterceptors(axios, store);
  } finally {
    render(
      <StoreProvider store={store}>
        <Router basename={process.env.BASE_URL}>
          <App />
        </Router>
      </StoreProvider>,
      document.getElementById('app'),
    );
  }
})();
