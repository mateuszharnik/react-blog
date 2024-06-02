import { PublicAPIService } from '@client/utils/apiUtils';
import { apiConstants } from '@shared/constants';

export class PublicDocsAPIService extends PublicAPIService {
  getRefreshToken(options) {
    return this.client.post(apiConstants.DOCS.REFRESH_TOKEN.ROOT, options);
  }

  signIn(payload, options) {
    return this.client.post(apiConstants.DOCS.SIGN_IN.ROOT, payload, options);
  }
}
