import '@client/helpers/disableDevTools';
import React from 'react';
import { render } from 'react-dom';
import { StoreProvider } from 'easy-peasy';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter as Router } from 'react-router-dom';
import setInterceptors from '@client/helpers/libs/axios/interceptors';
import i18n from '@client/locales/i18n';
import initSentry from '@client/helpers/sentry';
import initAOS from '@client/helpers/aos';
import store from '@client/store/index.store';
import App from '@client/App';
import './index.scss';

(async () => {
  try {
    const axios = (await import(/* webpackChunkName: 'axios' */ '@client/helpers/libs/axios')).default;
    setInterceptors(axios, store);

    initAOS();
    initSentry();
  } finally {
    render(
      <StoreProvider store={store}>
        <Router basename={process.env.BASE_URL}>
          <I18nextProvider i18n={i18n}>
            <App />
          </I18nextProvider>
        </Router>
      </StoreProvider>,
      document.getElementById('app'),
    );
  }
})();
