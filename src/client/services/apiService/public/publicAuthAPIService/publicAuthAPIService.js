import PublicAPIService from '@client/services/apiService/public/publicAPIService';
import { apiConstants } from '@shared/constants';

export class PublicAuthAPIService extends PublicAPIService {
  signIn = (payload, options, asAdmin = false) => {
    const url = asAdmin ? apiConstants.AUTH.ADMIN.SIGN_IN.ROOT : apiConstants.AUTH.SIGN_IN.ROOT;

    return this.client.post(url, payload, options);
  };

  signUp = (payload, options) => this.client.post(apiConstants.AUTH.SIGN_UP.ROOT, payload, options);

  getRefreshToken = (payload, options, silent = false) => {
    const query = silent ? '?silent=true' : '';

    return this.client.post(`${apiConstants.AUTH.REFRESH_TOKEN.ROOT}${query}`, payload, options);
  };
}
