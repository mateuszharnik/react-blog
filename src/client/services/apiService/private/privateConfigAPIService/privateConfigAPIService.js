import { PrivateAPIService } from '@client/utils/apiUtils';

export class PrivateConfigAPIService extends PrivateAPIService {
  updateConfig(payload, options) {
    return this.client.put('', payload, options);
  }
}
