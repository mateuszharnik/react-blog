import { apiConstants } from '@shared/constants';

export class AuthAPIService {
  constructor(client) {
    this.client = client;
  }

  signIn(payload, options, asAdmin = false) {
    const url = asAdmin ? apiConstants.AUTH.ADMIN.SIGN_IN.NAME : apiConstants.AUTH.SIGN_IN.NAME;

    return this.client.post(url, payload, options);
  }

  signOut(payload, options) {
    return this.client.post(apiConstants.AUTH.SIGN_OUT.NAME, payload, options);
  }

  signUp(payload, options) {
    return this.client.post(apiConstants.AUTH.SIGN_UP.NAME, payload, options);
  }

  getRefreshToken(options) {
    return this.client.post(apiConstants.AUTH.REFRESH_TOKEN.NAME, {}, options);
  }
}
