import { render } from 'react-dom';
import { sentryService } from '@client/services/sentryService';
import { aosService } from '@client/services/aosService';
import StoreProvider from '@client/providers/storeProvider';
import RouterProvider from '@client/providers/routerProvider';
import I18nextProvider from '@client/providers/i18nextProvider';
import QueryClientProvider from '@client/providers/queryClientProvider';
import App from '@client/App';
import './index.scss';

aosService.initAOS();
sentryService.initSentry();

render(
  <StoreProvider>
    <RouterProvider>
      <I18nextProvider>
        <QueryClientProvider>
          <App />
        </QueryClientProvider>
      </I18nextProvider>
    </RouterProvider>
  </StoreProvider>,
  document.getElementById('app'),
);
