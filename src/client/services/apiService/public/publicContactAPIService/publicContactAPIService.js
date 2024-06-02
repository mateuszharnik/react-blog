import { PublicAPIService } from '@client/utils/apiUtils';

export class PublicContactAPIService extends PublicAPIService {
  getContact(options) {
    return this.client.get('', options);
  }
}
