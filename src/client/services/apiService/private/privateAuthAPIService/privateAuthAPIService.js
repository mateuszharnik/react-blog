import { PrivateAPIService } from '@client/utils/apiUtils';
import { apiConstants } from '@shared/constants';

export class PrivateAuthAPIService extends PrivateAPIService {
  signOut(payload, options) {
    return this.client.post(apiConstants.AUTH.SIGN_OUT.ROOT, payload, options);
  }
}
