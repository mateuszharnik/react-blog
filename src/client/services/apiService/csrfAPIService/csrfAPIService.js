import { apiConstants } from '@shared/constants';

export class CsrfAPIService {
  constructor(client) {
    this.client = client;
  }

  async getCSRFToken(options) {
    const response = await this.client.get(apiConstants.CSRF_TOKEN.NAME, options);

    this.#setCSRFHeader(response.data.CSRFToken);

    return response;
  }

  #setCSRFHeader(token) {
    this.client.defaults.headers.common['X-CSRF-TOKEN'] = token;
  }
}
