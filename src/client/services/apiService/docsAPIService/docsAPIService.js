import { apiConstants } from '@shared/constants';

export class DocsAPIService {
  constructor(client) {
    this.client = client;
  }

  getRefreshToken(options) {
    return this.client.post(apiConstants.DOCS.REFRESH_TOKEN.NAME, options);
  }

  signIn(payload, options) {
    return this.client.post(apiConstants.DOCS.SIGN_IN.NAME, payload, options);
  }
}
