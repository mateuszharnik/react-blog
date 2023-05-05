import { apiConstants } from '@shared/constants';

export class AboutAPIService {
  constructor(client) {
    this.client = client;
  }

  getAbout(options) {
    return this.client.get(apiConstants.ABOUT.NAME, options);
  }

  updateAbout(payload, options) {
    return this.client.put(apiConstants.ABOUT.NAME, payload, options);
  }
}
