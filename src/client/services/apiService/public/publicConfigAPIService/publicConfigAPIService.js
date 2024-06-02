import { PublicAPIService } from '@client/utils/apiUtils';

export class PublicConfigAPIService extends PublicAPIService {
  getConfig(options) {
    return this.client.get('', options);
  }
}
