import { PrivateAPIService } from '@client/utils/apiUtils';

export class PrivateAboutAPIService extends PrivateAPIService {
  updateAbout(payload, options) {
    return this.client.put('', payload, options);
  }
}
