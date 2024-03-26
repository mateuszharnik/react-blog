import { createStore } from 'easy-peasy';
import { apiService } from '@client/services/apiService';
import { queryService } from '@client/services/queryService';
import { isDevtoolsEnabled } from '@client/utils/envUtils';
import { csrfStore } from './csrf';
import { authStore } from './auth';
import { tokensStore } from './tokens';
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

apiService.setStore(store);
queryService.setStore(store);
