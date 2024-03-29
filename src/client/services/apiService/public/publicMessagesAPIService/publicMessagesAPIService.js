import { PublicAPIService } from '@client/utils/apiUtils';

export class PublicMessagesAPIService extends PublicAPIService {
  createMessage(payload, options) {
    return this.client.post('', payload, options);
  }
}
