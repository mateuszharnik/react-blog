import { PublicAPIService } from '@client/utils/apiUtils';

export class PublicAboutAPIService extends PublicAPIService {
  getAbout(options) {
    return this.client.get('', options);
  }
}
