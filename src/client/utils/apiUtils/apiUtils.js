// eslint-disable-next-line max-classes-per-file
import decode from 'jwt-decode';
import axios, { CanceledError } from 'axios';
import { envConfig } from '@client/configs/envConfig';
import { apiConstants, statusesConstants } from '@shared/constants';

export class PublicAPIService {
  #store = null;

  constructor(baseURL) {
    this.client = axios.create({ baseURL });

    this.#setInterceptors();
  }

  #setResponseInterceptor() {
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error instanceof CanceledError) {
          return Promise.reject(error);
        }

        return Promise.reject(error);
      },
    );
  }

  #setRequestInterceptor() {
    this.client.interceptors.request.use((config) => {
      if (!this.#store) Promise.reject(new Error('Store must be initiate'));

      const csrfToken = this.#store.getState().csrfStore?.csrfToken;

      if (csrfToken) {
        config.headers.common['X-CSRF-TOKEN'] = csrfToken;
      }

      return config;
    });
  }

  #setInterceptors() {
    this.#setRequestInterceptor();
    this.#setResponseInterceptor();
  }

  setStore(store) {
    this.#store = store;
  }
}

export class PrivateAPIService {
  #store = null;

  constructor(baseURL) {
    this.client = axios.create({ baseURL });

    this.#setInterceptors();
  }

  #checkIfShouldRefresh = (response, config) => {
    const isUnauthorized = response.status === statusesConstants.CODE.UNAUTHORIZED;
    const isNotRetry = !config?._retry;
    const isNotDocsUrl = response?.request?.responseURL !== `${envConfig.CLIENT_URL}${apiConstants.DOCS.ROOT}`;

    return isUnauthorized && isNotRetry && isNotDocsUrl;
  };

  #setResponseInterceptor() {
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (!this.#store) Promise.reject(new Error('Store must be initiate'));

        const { response, config } = error;

        if (error instanceof CanceledError) {
          return Promise.reject(error);
        }

        if (this.#checkIfShouldRefresh(response, config)) {
          try {
            config._retry = true;

            const accessToken = this.#store.getState().tokensStore?.accessToken;

            const { exp } = decode(accessToken);

            if ((Math.floor(Date.now() / 1000)) < exp) {
              return Promise.reject(error);
            }

            const { data } = await this.#store.getActions().tokensStore.getRefreshTokenAction({});

            if (data) {
              return this.client(config);
            }
          } catch (e) {
            return Promise.reject(error);
          }
        }

        return Promise.reject(error);
      },
    );
  }

  #setRequestInterceptor() {
    this.client.interceptors.request.use((config) => {
      if (!this.#store) Promise.reject(new Error('Store must be initiate'));

      const accessToken = this.#store.getState().tokensStore?.accessToken;
      const csrfToken = this.#store.getState().csrfStore?.csrfToken;

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      if (csrfToken) {
        config.headers.common['X-CSRF-TOKEN'] = csrfToken;
      }

      return config;
    });
  }

  #setInterceptors() {
    this.#setRequestInterceptor();
    this.#setResponseInterceptor();
  }

  setStore(store) {
    this.#store = store;
  }
}
