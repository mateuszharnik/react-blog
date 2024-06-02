import { PrivateAPIService } from '@client/utils/apiUtils';

export class PrivateMessagesAPIService extends PrivateAPIService {
  getMessages(options) {
    return this.client.get('', options);
  }
}
