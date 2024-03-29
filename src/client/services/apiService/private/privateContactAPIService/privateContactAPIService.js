import { PrivateAPIService } from '@client/utils/apiUtils';

export class PrivateContactAPIService extends PrivateAPIService {
  updateContact(payload, options) {
    return this.client.put('', payload, options);
  }
}
