import { createStore } from 'easy-peasy';
import { apiService } from '@client/services/apiService';
import { isDevtoolsEnabled } from '@client/utils/envUtils';
import { csrfStore } from './csrf';
import { authStore } from './auth';
import { tokensStore } from './tokens';
import { navigationStore } from './navigation';
import { aboutStore } from './about';
import { messagesStore } from './messages';
import { contactStore } from './contact';
import { configStore } from './config';
import { userStore } from './user';
import { docsStore } from './docs';

const model = {
  csrfStore,
  authStore,
  tokensStore,
  navigationStore,
  aboutStore,
  messagesStore,
  contactStore,
  configStore,
  userStore,
  docsStore,
};

export const store = createStore(
  model,
  {
    devTools: isDevtoolsEnabled,
  },
);

apiService.setInterceptors(store);
