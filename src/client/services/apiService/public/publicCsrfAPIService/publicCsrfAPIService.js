import { PublicAPIService } from '@client/utils/apiUtils';

export class PublicCsrfAPIService extends PublicAPIService {
  async getCSRFToken(options) {
    return this.client.get('', options);
  }
}
