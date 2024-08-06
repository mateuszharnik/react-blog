import PrivateAPIService from '@client/services/apiService/private/privateAPIService';

export class PrivateContactAPIService extends PrivateAPIService {
  updateContact = (payload, options) => this.client.put('', payload, options);
}
