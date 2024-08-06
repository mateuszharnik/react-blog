import PrivateAPIService from '@client/services/apiService/private/privateAPIService';

export class PrivateMessagesAPIService extends PrivateAPIService {
  getMessages = (options) => this.client.get('', options);
}
