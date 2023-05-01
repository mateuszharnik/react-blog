import axios, { CanceledError } from 'axios';
import decode from 'jwt-decode';
import { envConfig } from '@client/configs/envConfig';
import { apiConstants, statusesConstants } from '@shared/constants';
import { AboutAPIService } from './aboutAPIService';
import { ContactAPIService } from './contactAPIService';
import { ConfigAPIService } from './configAPIService';
import { AuthAPIService } from './authAPIService';
import { MessagesAPIService } from './messagesAPIService';
import { DocsAPIService } from './docsAPIService';
import { CsrfAPIService } from './csrfAPIService';

class APIService {
  #client = null;

  constructor(client, baseURL) {
    this.#client = client.create({ baseURL });

    this.isCancel = client.isCancel;
    this.CancelToken = client.CancelToken;

    this.about = new AboutAPIService(this.#client);
    this.contact = new ContactAPIService(this.#client);
    this.config = new ConfigAPIService(this.#client);
    this.auth = new AuthAPIService(this.#client);
    this.messages = new MessagesAPIService(this.#client);
    this.docs = new DocsAPIService(this.#client);
    this.csrf = new CsrfAPIService(this.#client);
  }

  #checkIfShouldRefresh = (response, config) => {
    const isUnauthorized = response.status === statusesConstants.CODE.UNAUTHORIZED;
    const isNotRetry = !config?._retry;
    const isNotDocsUrl = response?.request?.responseURL !== `${envConfig.CLIENT_URL}/${apiConstants.DOCS.ROOT}`;

    return isUnauthorized && isNotRetry && isNotDocsUrl;
  }

  #setResponseInterceptor(store) {
    this.#client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const { response, config } = error;

        if (error instanceof CanceledError) {
          return Promise.reject(error);
        }

        if (this.#checkIfShouldRefresh(response, config)) {
          try {
            config._retry = true;

            const accessToken = store.getState().tokensStore?.accessToken;

            const { exp } = decode(accessToken);

            if ((Math.floor(Date.now() / 1000)) < exp) {
              return Promise.reject(error);
            }

            const { data } = await store.getActions().tokensStore.getRefreshToken();

            if (data) {
              return this.#client(config);
            }
          } catch (e) {
            return Promise.reject(error);
          }
        }

        return Promise.reject(error);
      },
    );
  }

  #setRequestInterceptor(store) {
    this.#client.interceptors.request.use((config) => {
      const accessToken = store.getState().tokensStore?.accessToken;

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    });
  }

  setInterceptors(store) {
    this.#setRequestInterceptor(store);
    this.#setResponseInterceptor(store);
  }
}

export const apiService = new APIService(axios, apiConstants.BASE_URL.ROOT);
