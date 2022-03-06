import '@client/helpers/disableDevTools';
import React from 'react';
import { render } from 'react-dom';
import { StoreProvider } from 'easy-peasy';
import { BrowserRouter as Router } from 'react-router-dom';
import { init } from 'aos';
import App from '@client/App';
import store from '@client/store/index.store';
import './index.scss';

(async () => {
  try {
    const axios = (await import(/* webpackChunkName: 'axios' */ '@client/helpers/libs/axios')).default;

    axios.interceptors.request.use((config) => {
      const accessToken = store.getState().tokens?.accessToken;

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    });
  } finally {
    init({
      once: true,
    });

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
