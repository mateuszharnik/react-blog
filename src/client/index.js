import '@client/helpers/disableDevTools';
import React from 'react';
import decode from 'jwt-decode';
import { render } from 'react-dom';
import { StoreProvider } from 'easy-peasy';
import { BrowserRouter as Router } from 'react-router-dom';
import { init } from 'aos';
import App from '@client/App';
import store from '@client/store/index.store';
import './index.scss';

(async () => {
  init({
    once: true,
  });

  try {
    const axios = (await import(/* webpackChunkName: 'axios' */ '@client/helpers/libs/axios')).default;

    axios.interceptors.request.use((config) => {
      const accessToken = store.getState().tokens?.accessToken;

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    });

    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const { response, config } = error;

        if (
          response.status === 401
          && !config?._retry
          && response?.request?.responseURL !== `${process.env.CLIENT_URL}/api/v1/docs`
        ) {
          try {
            config._retry = true;

            const accessToken = store.getState().tokens?.accessToken;

            const { exp } = decode(accessToken);

            if ((Math.floor(Date.now() / 1000)) < exp) {
              return Promise.reject(error);
            }

            const { data } = await store.getActions().tokens.fetchRefreshToken();

            if (data) {
              return axios(config);
            }
          } catch (e) {
            return Promise.reject(error);
          }
        }

        return Promise.reject(error);
      },
    );
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
