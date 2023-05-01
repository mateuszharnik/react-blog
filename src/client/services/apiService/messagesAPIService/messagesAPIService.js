import { apiConstants } from '@shared/constants';

export class MessagesAPIService {
  constructor(client) {
    this.client = client;
  }

  getMessages(options) {
    return this.client.get(apiConstants.MESSAGES.NAME, options);
  }

  createMessage(payload, options) {
    return this.client.post(apiConstants.MESSAGES.NAME, payload, options);
  }
}
