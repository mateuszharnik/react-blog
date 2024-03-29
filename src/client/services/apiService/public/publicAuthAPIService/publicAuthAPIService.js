import { PublicAPIService } from '@client/utils/apiUtils';
import { apiConstants } from '@shared/constants';

export class PublicAuthAPIService extends PublicAPIService {
  signIn(payload, options, asAdmin = false) {
    const url = asAdmin ? apiConstants.AUTH.ADMIN.SIGN_IN.ROOT : apiConstants.AUTH.SIGN_IN.ROOT;

    return this.client.post(url, payload, options);
  }

  signUp(payload, options) {
    return this.client.post(apiConstants.AUTH.SIGN_UP.ROOT, payload, options);
  }

  getRefreshToken(options) {
    return this.client.post(apiConstants.AUTH.REFRESH_TOKEN.ROOT, {}, options);
  }
}
