import { apiConstants } from '@shared/constants';

export class ConfigAPIService {
  constructor(client) {
    this.client = client;
  }

  getConfig(options) {
    return this.client.get(apiConstants.CONFIG.NAME, options);
  }

  updateConfig(payload, options) {
    return this.client.put(apiConstants.CONFIG.NAME, payload, options);
  }
}
