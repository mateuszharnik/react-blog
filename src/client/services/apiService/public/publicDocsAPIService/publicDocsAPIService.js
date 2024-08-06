import PublicAPIService from '@client/services/apiService/public/publicAPIService';
import { apiConstants } from '@shared/constants';

export class PublicDocsAPIService extends PublicAPIService {
  getRefreshToken = (payload, options) => this.client
    .post(apiConstants.DOCS.REFRESH_TOKEN.ROOT, payload, options);

  signIn = (payload, options) => this.client.post(apiConstants.DOCS.SIGN_IN.ROOT, payload, options);
}
