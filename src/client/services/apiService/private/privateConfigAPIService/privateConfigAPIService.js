import PrivateAPIService from '@client/services/apiService/private/privateAPIService';

export class PrivateConfigAPIService extends PrivateAPIService {
  updateConfig = (payload, options) => this.client.put('', payload, options);
}
