import { createRoot } from 'react-dom/client';
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

const container = document.getElementById('app');
const root = createRoot(container);

root.render(
  <StoreProvider>
    <RouterProvider>
      <I18nextProvider>
        <QueryClientProvider>
          <App />
        </QueryClientProvider>
      </I18nextProvider>
    </RouterProvider>
  </StoreProvider>,
);
