import PrivateAPIService from '@client/services/apiService/private/privateAPIService';
import { apiConstants } from '@shared/constants';

export class PrivateAuthAPIService extends PrivateAPIService {
  signOut = (payload, options) => this.client
    .post(apiConstants.AUTH.SIGN_OUT.ROOT, payload, options);

  revokeRefreshToken = (payload, options) => this.client
    .post(apiConstants.AUTH.REVOKE_REFRESH_TOKEN.ROOT, payload, options);
}
