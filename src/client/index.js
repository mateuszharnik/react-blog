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
})();
