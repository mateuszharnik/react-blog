import { apiConstants } from '@shared/constants';

export class ContactAPIService {
  constructor(client) {
    this.client = client;
  }

  getContact(options) {
    return this.client.get(apiConstants.CONTACT.NAME, options);
  }

  updateContact(payload, options) {
    return this.client.put(apiConstants.CONTACT.NAME, payload, options);
  }
}
