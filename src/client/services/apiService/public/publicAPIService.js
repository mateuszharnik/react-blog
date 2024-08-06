import axios from 'axios';
import { ApiResponseError } from '@client/errors/apiResponseError';

class PublicAPIService {
  #store = null;

  constructor(baseURL) {
    this.client = axios.create({ baseURL });

    this.#setInterceptors();
  }

  #setResponseInterceptor() {
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (!this.#store) Promise.reject(new Error('Store must be initiate'));

        return Promise.reject(new ApiResponseError(error));
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

export default PublicAPIService;
